import { User } from './../models';

import Controller from './../utils/controller';

class UserController {

  constructor () {
    this._controller = new Controller( User );
  }

  createUser = async (req, res, next) => {
    try {
      const userData = (await this._controller.create( req.body )).get();
      delete userData.password;
      req.user = userData;
      next();
    } catch (e) {
      next( e );
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      res.send( `${await this._controller.delete( req.params.id )}` );
    } catch (e) {
      next( e );
    }
  };

  getUserById = async (req, res, next) => {
    try {

      res.send( await this._controller.read( req.params.id, {
        attributes: {
          exclude: ['password']
        }
      } ) );

    } catch (e) {
      next( e );
    }
  };

  findUserById = async (req, res, next) => {
    try {

      req.user = await this._controller.read( req.userId, {
        attributes: {
          exclude: ['password']
        }
      } );
      next();
    } catch (e) {
      next( e );
    }
  };

  updateUserById = async (req, res, next) => {
    try {
      const userData = (await this._controller.update( req.params.id, req.body )).get();
      delete userData.password;
      res.send( userData );
    } catch (e) {
      next( e );
    }
  };

}

export default new UserController();