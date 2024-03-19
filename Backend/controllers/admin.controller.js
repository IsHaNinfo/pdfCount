import adminService from "../services/admin.services.js";

const adminController = {

  adminLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await adminService.adminLogin(email, password);
      if (!result.status) {
        // If status is false, return status 400 with the error message
        res.status(400).json({ response_code: 400, error: result.message, });
      } else {
        // If status is true, return status 200 with the success message and token
        res.status(200).json({ response_code: 200, result });
      }
    } catch (error) {
      res.status(500).json({ response_code: 500,
        error: "Error occurred!",error });
    }
  },


  registerAdmin: async (req, res) => {
    try {
      const result = await adminService.registerAdmin();
      if (!result) {
        res.status(400).json({ response_code: 400, error: result.message });
      } else {
        // If status is true, return status 200 with the success message and token
        res.status(200).json({ response_code: 200,success: true, message: "Admin registered successfully"  });
      }
    } catch (error) {
      res.status(500).json({  
        response_code: 500,
        success: false, message: error.message });
    }
  },

  changeAdminPassword: async (req, res) => {
    const AdminId = req.params.id;
    const { oldPassword, newPassword } = req.body;
    try {
      const result = await adminService.changeAdminPassword(
        AdminId,
        oldPassword,
        newPassword
      );

      if (result.status=== false) {
        // If status is false, return status 400 with the error message
        res.status(400).json({ response_code: 400, error: result.message });
      } else {
        res.status(200).json({ response_code: 200, result,success: true, message: "Admin password updated"  });
      }    } catch (error) {
      res.status(500).json({ response_code: 500 ,error: "Error occurred!" });
    }
  },

getAdmin : async(req, res, next) =>{
    try {
      const adminData = await adminService.getAdmin();
      const simplifiedAdminData = adminData.map(admin => ({
        id: admin.id,
        email: admin.email,
      }));
      res.json(simplifiedAdminData);
    } catch (error) {
      next(error);
    }
  }

};

export default adminController;
