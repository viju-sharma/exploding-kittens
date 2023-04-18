export type LoginSuccessRes = {
    message: string;
    token: string;
    user: {
      _id: string;
      email: string;
      username: string;
    };
  };
