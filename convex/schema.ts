import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  drivers: defineTable({
    userId: v.string(),
    fullName: v.string(),
    phone: v.string(),
    driverId: v.string(),
    idNumber: v.optional(v.string()),
    verified: v.boolean(),
  }).index("by_user", ["userId"]),
  vehicles: defineTable({
    driverId: v.id("drivers"),
    make: v.string(), model: v.string(), registration: v.string(),
    photos: v.array(v.string()), active: v.boolean(),
  }).index("by_driver", ["driverId"]),
  routes: defineTable({
    driverId: v.id("drivers"), name: v.string(), stops: v.array(v.string()),
    price: v.number(), currency: v.string(), active: v.boolean(),
  }).index("by_driver", ["driverId"]),
  bankAccounts: defineTable({
    driverId: v.id("drivers"), bankName: v.string(), accountName: v.string(),
    maskedAccountNumber: v.string(), verified: v.boolean(),
  }).index("by_driver", ["driverId"]),
  transactions: defineTable({
    driverId: v.id("drivers"), routeId: v.optional(v.id("routes")),
    amount: v.number(), currency: v.string(), method: v.union(v.literal("qr"), v.literal("card"), v.literal("ewallet"), v.literal("mobile_money")),
    status: v.union(v.literal("paid"), v.literal("declined")), declineReason: v.optional(v.string()),
    passengerReference: v.string(), transactionReference: v.string(), createdAt: v.number(),
  }).index("by_driver", ["driverId"]).index("by_driver_date", ["driverId", "createdAt"]),
})

// Suggested functions to add later:
// - transactions.collect: validate fare, balance, method, then record atomically
// - transactions.listByPeriod: query by driver and date range
// - routes.updateFare: driver-scoped fare update
// - drivers.updateProfile: driver-scoped profile changes
// - vehicles.update: driver-scoped vehicle and photo metadata
