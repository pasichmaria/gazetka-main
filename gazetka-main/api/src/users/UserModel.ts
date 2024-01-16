import { Schema, model } from 'mongoose'

export const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'users',
    versionKey: false,
    id: true,
    toObject: { getters: true, virtuals: true }
  }
)

export const UserModel = model('user', UserSchema)
