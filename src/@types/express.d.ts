import { getInterface } from "../interfaces/interfaceUser";

declare global {
  namespace Express {
    export interface Request {
      user?: Partial<getInterface>;
    }
  }
}
const a = 1;
