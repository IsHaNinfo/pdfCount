import bcrypt from "bcrypt";
import { User } from "../models/model.js";
import sequelize from "../config/db.connection.js";
import { Op, where } from "sequelize";
import nodemailer from "nodemailer";

const userRepo = {

  registerUser: async (email, password, firstName, lastName) => {
    try {
      const encrypted_pw = await bcrypt.hash(password, 10);
      await sequelize.sync();
      const result = await User.create({
        email,
        password: encrypted_pw,
        firstName,
        lastName,
      }
      );
      return !!result;
    } catch (error) {
      throw error;
    }
  },

  //updateUser

  updateUser: async (userId, email, firstName, lastName, image, points, notificationToken) => {
    try {

      console.log(userId);

      const updatedRaws = await User.update({
        userId, email, firstName, lastName, image, points, notificationToken
      }, { where: { id: userId } }
      );
      if (updatedRaws > 0) {
        const updatedUser = await User.findByPk(userId);
        return updatedUser;
      }

    } catch (error) {
      throw error;
    }
  },

  updateUserSocketId: async (id, socketId) => {
    try {
      const updatedRaws = await User.update(
        { socketId },
        { where: { id } }
      );

      if (updatedRaws > 0) {
        const updatedUser = await User.findByPk(id);
        return updatedUser;
      }
    } catch (error) {
      throw error;
    }
  },
  removeSocketIdBySocketId: async (socketId) => {
    try {
      const updatedRaws = await User.update(
        { socketId:null },
        { where: { socketId } }
      );
      return updatedRaws;
    } catch (error) {
      throw error;
    }
  },

  getUserByEmail: async (email) => {
    try {
      const result = await User.findOne({
        where: { email: email },
      });

      return result;
    } catch (error) {
      throw error;
    }
  },

  getUserByEmailForLogin: async (email) => {
    try {
      const user = await User.findOne({
        where: { email: email },
      });

      return user;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const result = await User.findOne({
        where: {
          id: userId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  //get all user 

  getAllUsers: async (userId) => {
    try {
      const allUsers = await User.findAll({
        where: {
          id: {
            [Op.ne]: userId, 
          },
        },
      });
      return allUsers;
    } catch (error) {
      throw error;
    }
  },




  getUsersByPage: async ({ page, limit, orderBy, sortBy, keyword }) => {

    try {
      const query = {};
      if (keyword) {
        query[Op.or] = [
          { firstName: { [Op.startsWith]: keyword } },
          { lastName: { [Op.startsWith]: keyword } }
        ];
      }

      const queries = {
        offset: (page - 1) * limit,
        limit
      }

      if (orderBy) {
        queries.order = [[orderBy, sortBy]]
      }
      const users = await User.findAndCountAll({
        where: query,
        attributes: ['id', 'firstName', 'lastName', 'email', 'image', 'points', "createdAt"],
        ...queries
      })

      return {
        totalPages: Math.ceil(users?.count / limit),
        totalItems: users?.count,
        data: users?.rows
      };
    } catch (error) {
      throw error;
    }
  },

  deleteUserById: async (userId) => {
    try {
      const result = await User.destroy({
        where: {
          id: userId,
        }
      })
      return result;
    } catch (error) {
      throw error;
    }
  },

  changeUserPassword: async (userId, newPasswordHash) => {
    try {
      await sequelize.sync();
      const result = await User.update(
        {
          password: newPasswordHash,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  storeOTP: async (userId, otp, expireTime) => {

    try {
      await User.update({
        otp,
        otpExpiryTime: expireTime,
      }, { where: { id: userId }, });
    } catch (error) {
      throw error;
    }
  },

  getStroedOTP: async (userId) => {
    try {
      const user = await User.findOne({
        where: { id: userId },
        attributes: ['otp', 'otpExpiryTime']
      });
      return user ? { otp: user.otp, expiryTime: user.otpExpiryTime } : null;
    } catch (error) {
      throw error;
    }
  },

  clearStoredOTP: async (userId) => {
    try {
      await User.update({
        otp: null,
        otpExpiryTime: null
      }, {
        where: { id: userId },
      });
    } catch (error) {
      throw error;

    }
  }

}

export default userRepo;
