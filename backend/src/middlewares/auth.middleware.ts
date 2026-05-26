import { Request, Response, NextFunction } from 'express';
import { requireAuth as clerkRequireAuth, clerkClient } from '@clerk/express';
import { User } from '../models/user.model';
import { Assignment } from '../models/assignment.model';
import { LibraryItem } from '../models/library.model';
import { Notification } from '../models/notification.model';
import { env } from '../config/env';

// Middleware to bypass auth if keys are missing (for local development preview),
// otherwise use Clerk's requireAuth() middleware.
export function requireAuth() {
  if (!env.CLERK_SECRET_KEY || !env.CLERK_PUBLISHABLE_KEY) {
    return (req: Request, res: Response, next: NextFunction) => {
      // Inject mock user auth details
      (req as any).auth = { userId: 'user_tester' };
      next();
    };
  }
  return clerkRequireAuth();
}

export async function syncUserMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = (req as any).auth;
    if (auth && auth.userId) {
      const clerkId = auth.userId;
      
      // Check if user already exists in DB
      let user = await User.findOne({ clerkId });
      if (!user) {
        let email = 'tester@shiven.com';
        let firstName = 'Shiven';
        let lastName = 'Tester';
        let imageUrl = '';
        
        // Fetch details from Clerk if secret key is present
        if (env.CLERK_SECRET_KEY && env.CLERK_PUBLISHABLE_KEY && clerkId !== 'user_tester') {
          try {
            const clerkUser = await clerkClient.users.getUser(clerkId);
            email = clerkUser.emailAddresses[0]?.emailAddress || email;
            firstName = clerkUser.firstName || firstName;
            lastName = clerkUser.lastName || lastName;
            imageUrl = clerkUser.imageUrl || imageUrl;
          } catch (clerkErr) {
            console.error('Failed to fetch user from Clerk:', clerkErr);
          }
        }
        
        // Create user in DB
        user = await User.create({
          clerkId,
          email,
          firstName,
          lastName,
          imageUrl,
        });
        console.log(`👤 Synced new user to DB: ${user.email} (${user.clerkId})`);
        
        // Claim seeded/unowned records for this user (First login claim)
        console.log(`🔑 Claiming unowned seeded records for ${user.email}...`);
        const assignRes = await Assignment.updateMany({ userId: { $exists: false } }, { userId: clerkId });
        const libRes = await LibraryItem.updateMany({ userId: { $exists: false } }, { userId: clerkId });
        const notifRes = await Notification.updateMany({ userId: { $exists: false } }, { userId: clerkId });
        
        console.log(`✅ Claimed ${assignRes.modifiedCount} assignments, ${libRes.modifiedCount} library items, and ${notifRes.modifiedCount} notifications.`);
      }
      
      (req as any).user = user;
    }
    next();
  } catch (error) {
    console.error('Error inside syncUserMiddleware:', error);
    next();
  }
}
