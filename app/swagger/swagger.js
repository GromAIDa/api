/**
 * @swagger
 * tags:
 *   name: Register/Login
 *   description: The register and login managing API
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   errors_schemas:
 *      forbidden:
 *        description: forbidden
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                       value:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *                    example:
 *                       value: test@gmail.com
 *                       msg: Email already in use. Please login, try another email or reset your password.
 *                       param: email
 *                       location: body
 *      unauthorized:
 *        description: unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                       value:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *                    example:
 *                       value: test
 *                       msg: jwt must be provided
 *                       param: authorization
 *                       location: headers
 *      bad_request:
 *        description: Given data is invalid
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                       value:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *                    example:
 *                       value: test
 *                       msg: Email is invalid.
 *                       param: email
 *                       location: body
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Register/Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                - email
 *                - roles
 *                - password
 *             properties:
 *               email:
 *                type: string
 *                description: Email of user
 *               roles:
 *                type: string
 *                description: Role of user
 *               password:
 *                type: string
 *                description: Password of user
 *     responses:
 *       201:
 *         description: Create user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Jwt token
 *       403:
 *          $ref: '#/components/errors_schemas/forbidden'
 *       400:
 *          $ref: '#/components/errors_schemas/bad_request'
 */

/**
 * @swagger
 * /register-identity:
 *   post:
 *     tags: [Register/Login]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                - firstName
 *                - lastName
 *                - phone
 *             properties:
 *               firstName:
 *                type: string
 *                description: First name of user
 *               lastName:
 *                type: string
 *                description: Last name of user
 *               phone:
 *                type: string
 *                description: Phone of user
 *     responses:
 *       201:
 *         description: User has created
 *       401:
 *         $ref: '#/components/errors_schemas/unauthorized'
 *       400:
 *         $ref: '#/components/errors_schemas/bad_request'
 */
/**
 * @swagger
 * /email-verification:
 *   put:
 *     tags: [Register/Login]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Email has verificated
 *       401:
 *         $ref: '#/components/errors_schemas/unauthorized'
 */
/**
 * @swagger
 * /email-verification:
 *   post:
 *     tags: [Register/Login]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Email has sended
 *       401:
 *         $ref: '#/components/errors_schemas/unauthorized'
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Register/Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                - email
 *                - password
 *             properties:
 *               email:
 *                type: string
 *                description: Email of user
 *               password:
 *                type: string
 *                description: Password of user
 *               isRemember:
 *                type: boolean
 *     responses:
 *       201:
 *         description: User has created
 *       403:
 *         $ref: '#/components/errors_schemas/forbidden'
 */
