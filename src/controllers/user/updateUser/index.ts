// services
import { userService } from "@/services/user";
// others
import { catchAsync } from "@/utils";

export const updateUser = catchAsync(
  async (req, res): Promise<void> => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.send(user);
  }
);
