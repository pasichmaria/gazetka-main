import { Schema, model, Types } from 'mongoose'

const PaperSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    publisher: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    extra: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: 'papers',
    versionKey: false,
    id: true,
    toObject: { getters: true, virtuals: true }
  }
)

export const PaperModel = model('paper', PaperSchema)
