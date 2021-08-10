// services
import { authService } from "@/services/auth";
import { tokenService } from "@/services/token";
// others
import { catchAsync } from "@/utils";

export const login = catchAsync(
  async (req, res): Promise<void> => {
    const { email, password } = req.body;
    const user = await authService.loginByEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  }
);
