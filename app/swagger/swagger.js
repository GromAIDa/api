/**
 * @swagger
 * tags:
 *   - name: Register/Login
 *     description: The register and login managing API
 *   - name: Transactions
 *     description: The transactions managing API
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

// Register/Login ------------------------

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
 *                - firstName
 *                - lastName
 *                - phone
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
 *               firstName:
 *                type: string
 *                description: First name of user
 *               lastName:
 *                type: string
 *                description: Last name of user
 *               phone:
 *                type: string
 *                description: Phone of user
 *               info:
 *                type: string
 *                description: Description
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

// /**
//  * @swagger
//  * /register-identity:
//  *   post:
//  *     tags: [Register/Login]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *                - firstName
//  *                - lastName
//  *                - phone
//  *             properties:
//  *               firstName:
//  *                type: string
//  *                description: First name of user
//  *               lastName:
//  *                type: string
//  *                description: Last name of user
//  *               phone:
//  *                type: string
//  *                description: Phone of user
//  *     responses:
//  *       201:
//  *         description: User has created
//  *       401:
//  *         $ref: '#/components/errors_schemas/unauthorized'
//  *       400:
//  *         $ref: '#/components/errors_schemas/bad_request'
//  */
/**
 * @swagger
 * /email-verification:
 *   put:
 *     tags: [Register/Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of user
 *     responses:
 *       201:
 *         description: Email code has sended
 *       403:
 *         $ref: '#/components/errors_schemas/forbidden'
 */
/**
 * @swagger
 * /email-verification:
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
 *                - verificationCode
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of user
 *               verificationCode:
 *                 type: number
 *                 description: Verification code
 *     responses:
 *       200:
 *         description: Email has verificated
 *       400:
 *         $ref: '#/components/errors_schemas/bad_request'
 *       403:
 *         $ref: '#/components/errors_schemas/forbidden'
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

/**
 * @swagger
 * /subscribe-update:
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
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of user
 *     responses:
 *       201:
 *         description: Email has added
 *       400:
 *         $ref: '#/components/errors_schemas/bad_request'
 *       403:
 *         $ref: '#/components/errors_schemas/forbidden'
 */

// Transactions ------------------------

/**
 * @swagger
 * /transaction/usdt:
 *   get:
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 5, 10, 20
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transactions list has gotten
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 625189a810f36ef4a9fc8fd4
 *                 balance:
 *                   type: number
 *                   description: Balance
 *                   example: 921
 *                 from:
 *                   type: string
 *                   description: Address from
 *                   example: 0xfBfeC468f464fdb05E4B3963222b56559fA2d94a
 *                 to:
 *                   type: string
 *                   description: Address to
 *                   example: 0x5923B28c59c027b3Cd6a8E51e794BF8004d2ecc3
 *                 value:
 *                   type: string
 *                   description: Amount
 *                   example: 302.0
 *                 createdAt:
 *                   type: string
 *                   example: 2022-04-09T13:27:03.480+00:00
 *                 updatedAt:
 *                   type: string
 *                   example: 2022-04-09T13:27:03.480+00:00
 *                 data:
 *                   type: object
 *                   properties:
 *                     blockNumber:
 *                       type: number
 *                     blockHash:
 *                       type: string
 *                     transactionIndex:
 *                       type: number
 *                     removed:
 *                       type: boolean
 *                     address:
 *                       type: string
 *                     data:
 *                       type: string
 *                     topics:
 *                       type: array
 *                     transactionHash:
 *                       type: string
 *                     logIndex:
 *                       type: string
 *                     event:
 *                       type: string
 *                     eventSignature:
 *                       type: string
 *                   example:
 *                     blockNumber: 23382782
 *                     blockHash: 0xaa3c331b17ec39b89592359c46ef57176eefff4b6bf73f55413c8a27c33d55b7
 *                     transactionIndex: 21
 *                     removed: false
 *                     address: 0x08dEAad576175d71A953A0364A4262b087f22978
 *                     data: 0x00000000000000000000000000000000000000000000001794d673456eec0000
 *                     topics: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef, 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
 *                     transactionHash: 0xc8d2029fc04e5835a60f8d30d8c1ae3a74fb816b45c617f02060df8d52a818c8
 *                     logIndex: 34
 *                     event: Transfer
 *                     eventSignature: Transfer(address,address,uint256)
 *
 *       400:
 *         $ref: '#/components/errors_schemas/bad_request'
 */
/**
 * @swagger
 * /transaction/currency:
 *   get:
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 5, 10, 20
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transactions list has gotten
 *       400:
 *         $ref: '#/components/errors_schemas/bad_request'
 */

/**
 * @swagger
 * /create-payment-link:
 *   post:
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                - amount
 *                - success_url
 *                - cancel_url
 *                - currency
 *                - description
 *             properties:
 *               amount:
 *                type: number
 *                description: Amount of payment
 *               success_url:
 *                type: string
 *                description: Url for success payment
 *               cancel_url:
 *                type: string
 *                description: Url for decline payment
 *               currency:
 *                type: string
 *               description:
 *                type: string
 *     responses:
 *       201:
 *         description: User has created
 *       400:
 *         $ref: '#/components/errors_schemas/bad_request'
 */
