import userService from "../services/user.services.js";

const userController = {

  registerUser: async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      const result = await userService.registerUser(email, password, firstName, lastName,);

      if (result.status) {
        // Status is true, so registration is successful
        res.status(200).json({
          response_code: 200,
          success: true,
          message: result.message,
          user: { firstName, lastName, email },
          token: result.token
        });
      } else {
        // Status is false, there is an error
        res.status(400).json({
          response_code: 400,
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        error: error,
        success: false,
        message: 'Error occurred while registering user'
      });
    }
  },

  userLogin: async (req, res) => {
    const { email, password, } = req.body;
    try {
      const result = await userService.userLogin(email, password,);
      if (result.status) {
        // Status is true, so registration is successful
        res.status(200).json({
          response_code: 200,
          success: true,
          message: result.message,
          result
        });
      } else {
        console.log(result);
        // Status is false, there is an error
        res.status(400).json({
          response_code: 400,
          success: false,
          message: result.message
        });
      }


    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error,
        response_code: 500,
        error: 'Error occurred'
      });
    }
  },
  getAllUsersForUser: async (req, res) => {
    const userId = req.userId.id;
    try {
      const allUsers = await userService.getAllUsersForUser(userId);
      res.status(200).json({
        response_code: 200,
        success: true, users: allUsers
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        success: false, message: 'Error occurred while fetching users'
      });
    }
  },
  getUserByPage: async (req, res) => {
    try {
      const { page = 1, limit = 3, orderBy = 'email', sortBy = 'asc', keyword } = req.query;


      const users = await userService.getAllUserByPage({
        page: +page ? +page : 1,
        limit: +limit ? +limit : 3,
        orderBy,
        sortBy,
        keyword
      });

      res.status(200).json(
        {
          response_code: 200,
          success: true,
          users
        });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        response_code: 500,
        success: false, message: 'Error occurred while fetching users'
      });
    }
  },









}

export default userController;