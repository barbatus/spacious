import unless from 'koa-unless';

const resolveAuthToken = (ctx) => {
  if (!ctx.header || !ctx.header.authorization) {
    return;
  }
  const [part1, part2] = ctx.header.authorization.trim().split(' ');
  if (part1 && /^Bearer$/i.test(part1)) {
    return part2;
  }
  ctx.throw(401, 'Bad Authorization header format.');
};

export const authMiddleware = async (ctx, next) => {
  const token = resolveAuthToken(ctx);
  if (!token || token !== 'strapiBearerToken') {
    ctx.throw(401, 'Authentication Error');
  }
  return next();
};

authMiddleware.unless = unless;
