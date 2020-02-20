
import { ObjectId } from "mongodb";
import { IResolvers } from "apollo-server-express";
import { Database, Listing } from '../lib/types';



export const resolvers: IResolvers = {
    Query: {
        listings: (_root: undefined, _args: {}, {db}:{db: Database}): Promise<Listing[]> => {
            return db.listings.find({}).toArray();
        }
    },
    Mutation: {
        deleteListing: async (_root: undefined, {id}: {id: string}, {db}:{db: Database}): Promise<Listing> => {
            const deleteRes = await db.listings.findOneAndDelete({
                _id: new ObjectId(id),
            });

            if (!deleteRes.value) {
                throw new Error('failed to Delete listing');
            }

            return deleteRes.value;
        }
    },
    Listing: {
        id: (listing: Listing) => listing._id.toString()
    }
};