import { Request, Response } from 'express'
import { Types, isValidObjectId } from 'mongoose'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import * as Interfaces from './interfaces'
import { PaperModel } from './PaperModel'

async function get(req: Request<{ id: string }>, res: Response): Promise<Response> {
  if (!isValidObjectId(req.params.id))
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
  const paper = await PaperModel.findById(req.params.id)
  if (!paper) return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  return res.status(StatusCodes.OK).send(paper.toObject())
}

async function create(
  req: Request<unknown, string, Interfaces.Create>,
  res: Response<string>
): Promise<Response> {
  if (!req.isAuthenticated())
    return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
  const paper = await PaperModel.create({ ...req.body, userId: req.user.id })
  return res.status(StatusCodes.CREATED).send(paper.id)
}

async function update(
  req: Request<{ id: string }, string, Interfaces.Update>,
  res: Response<string>
): Promise<Response> {
  if (!isValidObjectId(req.params.id))
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
  if (!req.isAuthenticated())
    return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
  const paper = await PaperModel.findOneAndUpdate(
    { id: new Types.ObjectId(req.params.id), userId: new Types.ObjectId(req.user.id) },
    { ...req.body }
  )
  if (!paper) return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  return res.status(StatusCodes.OK).send(paper.id)
}

async function groups(req: Request, res: Response<string[]>): Promise<Response> {
  const groups = await PaperModel.distinct('group')
  return res.status(StatusCodes.OK).send(groups)
}

async function publishers(req: Request, res: Response<string[]>): Promise<Response> {
  const publishers = await PaperModel.distinct('publisher')
  return res.status(StatusCodes.OK).send(publishers)
}

async function list(
  req: Request<
    unknown,
    Interfaces.Paper[],
    unknown,
    {
      dateFrom?: string
      dateTo?: string
      group?: string
      publisher?: string
      searchValue?: string
      userId?: string
      page: number
      perPage: number
    }
  >,
  res: Response<Interfaces.Paper[]>
): Promise<Response> {
  const query: Record<string, unknown> = {}
  if (req.query.dateFrom) query.date = { $gte: new Date(req.query.dateFrom) }
  if (req.query.dateTo) query.date = { $lte: new Date(req.query.dateTo) }
  if (req.query.dateFrom && req.query.dateTo)
    query.date = { $lte: new Date(req.query.dateTo), $gte: new Date(req.query.dateFrom) }
  if (req.query.group) query.group = req.query.group
  if (req.query.publisher) query.publisher = req.query.publisher
  if (req.query.userId) query.userId = new Types.ObjectId(req.query.userId)
  if (req.query.searchValue)
    query.$or = [
      { publisher: { $regex: req.query.searchValue } },
      { name: { $regex: req.query.searchValue } },
      { description: { $regex: req.query.searchValue } },
      { group: { $regex: req.query.searchValue } },
      { extra: { $regex: req.query.searchValue } }
    ]
  const [data, total] = await Promise.all([
    PaperModel.find(
      query,
      {},
      {
        sort: { _id: -1 },
        skip: req.query.page * req.query.perPage,
        limit: req.query.perPage
      }
    ),
    PaperModel.countDocuments(query)
  ])

  return res
    .status(StatusCodes.OK)
    .set('Documents-Count', total.toString())
    .set('Access-Control-Expose-Headers', 'Documents-Count')
    .json(data.map((d) => d.toObject()))
}

async function remove(req: Request<{ id: string }>, res: Response<string>): Promise<Response> {
  if (!req.isAuthenticated())
    return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
  if (!isValidObjectId(req.params.id))
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY)
  const paper = await PaperModel.findOneAndDelete({
    id: new Types.ObjectId(req.params.id),
    userId: new Types.ObjectId(req.user.id)
  })
  if (!paper) return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  return res.status(StatusCodes.OK).send(paper.id)
}

export const papersController = { get, create, update, list, remove, publishers, groups }
