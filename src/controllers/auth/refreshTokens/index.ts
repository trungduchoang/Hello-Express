// services
import { authService } from "@/services/auth";
// others
import { catchAsync } from "@/utils";

export const refreshTokens = catchAsync(
  async (req, res): Promise<void> => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
  }
);
