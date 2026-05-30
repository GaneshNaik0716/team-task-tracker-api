const {
  authorize,
} = require("../src/middleware/rbac.middleware");

describe("RBAC Middleware", () => {
  test("should allow ADMIN access", () => {
    const req = {
      user: {
        role: "ADMIN",
      },
    };

    const res = {};

    const next = jest.fn();

    authorize(
      "ADMIN",
      "MANAGER"
    )(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should allow MANAGER access", () => {
    const req = {
      user: {
        role: "MANAGER",
      },
    };

    const res = {};

    const next = jest.fn();

    authorize(
      "ADMIN",
      "MANAGER"
    )(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("should deny MEMBER access", () => {
    const req = {
      user: {
        role: "MEMBER",
      },
    };

    const json = jest.fn();

    const res = {
      status: jest.fn(() => ({
        json,
      })),
    };

    const next = jest.fn();

    authorize(
      "ADMIN",
      "MANAGER"
    )(req, res, next);

    expect(res.status)
      .toHaveBeenCalledWith(403);

    expect(next)
      .not.toHaveBeenCalled();
  });
});