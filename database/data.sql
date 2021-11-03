insert into "users" (
  "userName",
  "userNumber",
  "userPassword",
  "userRole"
) values (
  'Meet Patel',
  '111',
  '$argon2i$v=19$m=4096,t=3,p=1$CQ/I2OSH+N9okHCtXhAOzA$JahNbJtNC6cWCzm9aNgaoZSA0UYQzLlYRKz8U6xPSNc',
  'Admin'
), (
  'test',
  '222',
  '$argon2i$v=19$m=4096,t=3,p=1$CQ/I2OSH+N9okHCtXhAOzA$JahNbJtNC6cWCzm9aNgaoZSA0UYQzLlYRKz8U6xPSNc',
  'Customer'
)
