import { Router } from 'express';
import express from 'express'
import { blogStatistic } from "../../controllers/AdminController/Blog.controller.js";
const app = express()
const blogStatisticRouter = Router()

blogStatisticRouter.get('/statistic',blogStatistic)

export default blogStatisticRouter