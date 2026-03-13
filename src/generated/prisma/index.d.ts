
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Member
 * 
 */
export type Member = $Result.DefaultSelection<Prisma.$MemberPayload>
/**
 * Model ContributionRule
 * Versioned monthly contribution rules.
 * Exactly one rule can exist per (month, year).
 */
export type ContributionRule = $Result.DefaultSelection<Prisma.$ContributionRulePayload>
/**
 * Model PenaltyRule
 * Versioned penalty rules (late fee).
 * The newest rule at or before a payment's due date applies, but each Payment stores its own penaltyAmountPaise permanently.
 */
export type PenaltyRule = $Result.DefaultSelection<Prisma.$PenaltyRulePayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Receipt
 * 
 */
export type Receipt = $Result.DefaultSelection<Prisma.$ReceiptPayload>
/**
 * Model Charity
 * 
 */
export type Charity = $Result.DefaultSelection<Prisma.$CharityPayload>
/**
 * Model Loan
 * 
 */
export type Loan = $Result.DefaultSelection<Prisma.$LoanPayload>
/**
 * Model LoanInstallment
 * 
 */
export type LoanInstallment = $Result.DefaultSelection<Prisma.$LoanInstallmentPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Setting
 * 
 */
export type Setting = $Result.DefaultSelection<Prisma.$SettingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const MemberStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type MemberStatus = (typeof MemberStatus)[keyof typeof MemberStatus]


export const PaymentMethod: {
  CASH: 'CASH',
  UPI: 'UPI',
  BANK: 'BANK'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const PaymentStatus: {
  PAID: 'PAID',
  PENDING: 'PENDING',
  LATE: 'LATE'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const LoanStatus: {
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  DEFAULTED: 'DEFAULTED'
};

export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type MemberStatus = $Enums.MemberStatus

export const MemberStatus: typeof $Enums.MemberStatus

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type LoanStatus = $Enums.LoanStatus

export const LoanStatus: typeof $Enums.LoanStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.member`: Exposes CRUD operations for the **Member** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Members
    * const members = await prisma.member.findMany()
    * ```
    */
  get member(): Prisma.MemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contributionRule`: Exposes CRUD operations for the **ContributionRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContributionRules
    * const contributionRules = await prisma.contributionRule.findMany()
    * ```
    */
  get contributionRule(): Prisma.ContributionRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.penaltyRule`: Exposes CRUD operations for the **PenaltyRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PenaltyRules
    * const penaltyRules = await prisma.penaltyRule.findMany()
    * ```
    */
  get penaltyRule(): Prisma.PenaltyRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.receipt`: Exposes CRUD operations for the **Receipt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Receipts
    * const receipts = await prisma.receipt.findMany()
    * ```
    */
  get receipt(): Prisma.ReceiptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.charity`: Exposes CRUD operations for the **Charity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Charities
    * const charities = await prisma.charity.findMany()
    * ```
    */
  get charity(): Prisma.CharityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loan`: Exposes CRUD operations for the **Loan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Loans
    * const loans = await prisma.loan.findMany()
    * ```
    */
  get loan(): Prisma.LoanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.loanInstallment`: Exposes CRUD operations for the **LoanInstallment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LoanInstallments
    * const loanInstallments = await prisma.loanInstallment.findMany()
    * ```
    */
  get loanInstallment(): Prisma.LoanInstallmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.setting`: Exposes CRUD operations for the **Setting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.setting.findMany()
    * ```
    */
  get setting(): Prisma.SettingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.1
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Member: 'Member',
    ContributionRule: 'ContributionRule',
    PenaltyRule: 'PenaltyRule',
    Payment: 'Payment',
    Receipt: 'Receipt',
    Charity: 'Charity',
    Loan: 'Loan',
    LoanInstallment: 'LoanInstallment',
    AuditLog: 'AuditLog',
    Setting: 'Setting'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "member" | "contributionRule" | "penaltyRule" | "payment" | "receipt" | "charity" | "loan" | "loanInstallment" | "auditLog" | "setting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Member: {
        payload: Prisma.$MemberPayload<ExtArgs>
        fields: Prisma.MemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findFirst: {
            args: Prisma.MemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findMany: {
            args: Prisma.MemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          create: {
            args: Prisma.MemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          createMany: {
            args: Prisma.MemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          delete: {
            args: Prisma.MemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          update: {
            args: Prisma.MemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          deleteMany: {
            args: Prisma.MemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          upsert: {
            args: Prisma.MemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMember>
          }
          groupBy: {
            args: Prisma.MemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberCountArgs<ExtArgs>
            result: $Utils.Optional<MemberCountAggregateOutputType> | number
          }
        }
      }
      ContributionRule: {
        payload: Prisma.$ContributionRulePayload<ExtArgs>
        fields: Prisma.ContributionRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContributionRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContributionRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload>
          }
          findFirst: {
            args: Prisma.ContributionRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContributionRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload>
          }
          findMany: {
            args: Prisma.ContributionRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload>[]
          }
          create: {
            args: Prisma.ContributionRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload>
          }
          createMany: {
            args: Prisma.ContributionRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContributionRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload>[]
          }
          delete: {
            args: Prisma.ContributionRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload>
          }
          update: {
            args: Prisma.ContributionRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload>
          }
          deleteMany: {
            args: Prisma.ContributionRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContributionRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContributionRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload>[]
          }
          upsert: {
            args: Prisma.ContributionRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContributionRulePayload>
          }
          aggregate: {
            args: Prisma.ContributionRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContributionRule>
          }
          groupBy: {
            args: Prisma.ContributionRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContributionRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContributionRuleCountArgs<ExtArgs>
            result: $Utils.Optional<ContributionRuleCountAggregateOutputType> | number
          }
        }
      }
      PenaltyRule: {
        payload: Prisma.$PenaltyRulePayload<ExtArgs>
        fields: Prisma.PenaltyRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PenaltyRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PenaltyRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload>
          }
          findFirst: {
            args: Prisma.PenaltyRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PenaltyRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload>
          }
          findMany: {
            args: Prisma.PenaltyRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload>[]
          }
          create: {
            args: Prisma.PenaltyRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload>
          }
          createMany: {
            args: Prisma.PenaltyRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PenaltyRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload>[]
          }
          delete: {
            args: Prisma.PenaltyRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload>
          }
          update: {
            args: Prisma.PenaltyRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload>
          }
          deleteMany: {
            args: Prisma.PenaltyRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PenaltyRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PenaltyRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload>[]
          }
          upsert: {
            args: Prisma.PenaltyRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PenaltyRulePayload>
          }
          aggregate: {
            args: Prisma.PenaltyRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePenaltyRule>
          }
          groupBy: {
            args: Prisma.PenaltyRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PenaltyRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PenaltyRuleCountArgs<ExtArgs>
            result: $Utils.Optional<PenaltyRuleCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Receipt: {
        payload: Prisma.$ReceiptPayload<ExtArgs>
        fields: Prisma.ReceiptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReceiptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReceiptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          findFirst: {
            args: Prisma.ReceiptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReceiptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          findMany: {
            args: Prisma.ReceiptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          create: {
            args: Prisma.ReceiptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          createMany: {
            args: Prisma.ReceiptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReceiptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          delete: {
            args: Prisma.ReceiptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          update: {
            args: Prisma.ReceiptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          deleteMany: {
            args: Prisma.ReceiptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReceiptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReceiptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          upsert: {
            args: Prisma.ReceiptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          aggregate: {
            args: Prisma.ReceiptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReceipt>
          }
          groupBy: {
            args: Prisma.ReceiptGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReceiptGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReceiptCountArgs<ExtArgs>
            result: $Utils.Optional<ReceiptCountAggregateOutputType> | number
          }
        }
      }
      Charity: {
        payload: Prisma.$CharityPayload<ExtArgs>
        fields: Prisma.CharityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CharityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CharityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload>
          }
          findFirst: {
            args: Prisma.CharityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CharityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload>
          }
          findMany: {
            args: Prisma.CharityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload>[]
          }
          create: {
            args: Prisma.CharityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload>
          }
          createMany: {
            args: Prisma.CharityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CharityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload>[]
          }
          delete: {
            args: Prisma.CharityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload>
          }
          update: {
            args: Prisma.CharityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload>
          }
          deleteMany: {
            args: Prisma.CharityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CharityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CharityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload>[]
          }
          upsert: {
            args: Prisma.CharityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CharityPayload>
          }
          aggregate: {
            args: Prisma.CharityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharity>
          }
          groupBy: {
            args: Prisma.CharityGroupByArgs<ExtArgs>
            result: $Utils.Optional<CharityGroupByOutputType>[]
          }
          count: {
            args: Prisma.CharityCountArgs<ExtArgs>
            result: $Utils.Optional<CharityCountAggregateOutputType> | number
          }
        }
      }
      Loan: {
        payload: Prisma.$LoanPayload<ExtArgs>
        fields: Prisma.LoanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          findFirst: {
            args: Prisma.LoanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          findMany: {
            args: Prisma.LoanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          create: {
            args: Prisma.LoanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          createMany: {
            args: Prisma.LoanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          delete: {
            args: Prisma.LoanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          update: {
            args: Prisma.LoanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          deleteMany: {
            args: Prisma.LoanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          upsert: {
            args: Prisma.LoanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          aggregate: {
            args: Prisma.LoanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoan>
          }
          groupBy: {
            args: Prisma.LoanGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanCountArgs<ExtArgs>
            result: $Utils.Optional<LoanCountAggregateOutputType> | number
          }
        }
      }
      LoanInstallment: {
        payload: Prisma.$LoanInstallmentPayload<ExtArgs>
        fields: Prisma.LoanInstallmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanInstallmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanInstallmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload>
          }
          findFirst: {
            args: Prisma.LoanInstallmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanInstallmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload>
          }
          findMany: {
            args: Prisma.LoanInstallmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload>[]
          }
          create: {
            args: Prisma.LoanInstallmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload>
          }
          createMany: {
            args: Prisma.LoanInstallmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoanInstallmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload>[]
          }
          delete: {
            args: Prisma.LoanInstallmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload>
          }
          update: {
            args: Prisma.LoanInstallmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload>
          }
          deleteMany: {
            args: Prisma.LoanInstallmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanInstallmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoanInstallmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload>[]
          }
          upsert: {
            args: Prisma.LoanInstallmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanInstallmentPayload>
          }
          aggregate: {
            args: Prisma.LoanInstallmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoanInstallment>
          }
          groupBy: {
            args: Prisma.LoanInstallmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanInstallmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanInstallmentCountArgs<ExtArgs>
            result: $Utils.Optional<LoanInstallmentCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Setting: {
        payload: Prisma.$SettingPayload<ExtArgs>
        fields: Prisma.SettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findFirst: {
            args: Prisma.SettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findMany: {
            args: Prisma.SettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          create: {
            args: Prisma.SettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          createMany: {
            args: Prisma.SettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          delete: {
            args: Prisma.SettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          update: {
            args: Prisma.SettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          deleteMany: {
            args: Prisma.SettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          upsert: {
            args: Prisma.SettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          aggregate: {
            args: Prisma.SettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetting>
          }
          groupBy: {
            args: Prisma.SettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingCountArgs<ExtArgs>
            result: $Utils.Optional<SettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    member?: MemberOmit
    contributionRule?: ContributionRuleOmit
    penaltyRule?: PenaltyRuleOmit
    payment?: PaymentOmit
    receipt?: ReceiptOmit
    charity?: CharityOmit
    loan?: LoanOmit
    loanInstallment?: LoanInstallmentOmit
    auditLog?: AuditLogOmit
    setting?: SettingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    contributionRulesCreated: number
    penaltyRulesCreated: number
    paymentsRecorded: number
    charitiesCreated: number
    loansCreated: number
    loansApproved: number
    installmentsRecorded: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contributionRulesCreated?: boolean | UserCountOutputTypeCountContributionRulesCreatedArgs
    penaltyRulesCreated?: boolean | UserCountOutputTypeCountPenaltyRulesCreatedArgs
    paymentsRecorded?: boolean | UserCountOutputTypeCountPaymentsRecordedArgs
    charitiesCreated?: boolean | UserCountOutputTypeCountCharitiesCreatedArgs
    loansCreated?: boolean | UserCountOutputTypeCountLoansCreatedArgs
    loansApproved?: boolean | UserCountOutputTypeCountLoansApprovedArgs
    installmentsRecorded?: boolean | UserCountOutputTypeCountInstallmentsRecordedArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountContributionRulesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContributionRuleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPenaltyRulesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PenaltyRuleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsRecordedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCharitiesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLoansCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLoansApprovedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInstallmentsRecordedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanInstallmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type MemberCountOutputType
   */

  export type MemberCountOutputType = {
    payments: number
    loans: number
  }

  export type MemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | MemberCountOutputTypeCountPaymentsArgs
    loans?: boolean | MemberCountOutputTypeCountLoansArgs
  }

  // Custom InputTypes
  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCountOutputType
     */
    select?: MemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
  }


  /**
   * Count Type LoanCountOutputType
   */

  export type LoanCountOutputType = {
    installments: number
  }

  export type LoanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    installments?: boolean | LoanCountOutputTypeCountInstallmentsArgs
  }

  // Custom InputTypes
  /**
   * LoanCountOutputType without action
   */
  export type LoanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanCountOutputType
     */
    select?: LoanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoanCountOutputType without action
   */
  export type LoanCountOutputTypeCountInstallmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanInstallmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    passwordHash: string
    role: $Enums.UserRole
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contributionRulesCreated?: boolean | User$contributionRulesCreatedArgs<ExtArgs>
    penaltyRulesCreated?: boolean | User$penaltyRulesCreatedArgs<ExtArgs>
    paymentsRecorded?: boolean | User$paymentsRecordedArgs<ExtArgs>
    charitiesCreated?: boolean | User$charitiesCreatedArgs<ExtArgs>
    loansCreated?: boolean | User$loansCreatedArgs<ExtArgs>
    loansApproved?: boolean | User$loansApprovedArgs<ExtArgs>
    installmentsRecorded?: boolean | User$installmentsRecordedArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "role" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contributionRulesCreated?: boolean | User$contributionRulesCreatedArgs<ExtArgs>
    penaltyRulesCreated?: boolean | User$penaltyRulesCreatedArgs<ExtArgs>
    paymentsRecorded?: boolean | User$paymentsRecordedArgs<ExtArgs>
    charitiesCreated?: boolean | User$charitiesCreatedArgs<ExtArgs>
    loansCreated?: boolean | User$loansCreatedArgs<ExtArgs>
    loansApproved?: boolean | User$loansApprovedArgs<ExtArgs>
    installmentsRecorded?: boolean | User$installmentsRecordedArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      contributionRulesCreated: Prisma.$ContributionRulePayload<ExtArgs>[]
      penaltyRulesCreated: Prisma.$PenaltyRulePayload<ExtArgs>[]
      paymentsRecorded: Prisma.$PaymentPayload<ExtArgs>[]
      charitiesCreated: Prisma.$CharityPayload<ExtArgs>[]
      loansCreated: Prisma.$LoanPayload<ExtArgs>[]
      loansApproved: Prisma.$LoanPayload<ExtArgs>[]
      installmentsRecorded: Prisma.$LoanInstallmentPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      passwordHash: string
      role: $Enums.UserRole
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contributionRulesCreated<T extends User$contributionRulesCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$contributionRulesCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    penaltyRulesCreated<T extends User$penaltyRulesCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$penaltyRulesCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    paymentsRecorded<T extends User$paymentsRecordedArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsRecordedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    charitiesCreated<T extends User$charitiesCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$charitiesCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    loansCreated<T extends User$loansCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$loansCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    loansApproved<T extends User$loansApprovedArgs<ExtArgs> = {}>(args?: Subset<T, User$loansApprovedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    installmentsRecorded<T extends User$installmentsRecordedArgs<ExtArgs> = {}>(args?: Subset<T, User$installmentsRecordedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.contributionRulesCreated
   */
  export type User$contributionRulesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
    where?: ContributionRuleWhereInput
    orderBy?: ContributionRuleOrderByWithRelationInput | ContributionRuleOrderByWithRelationInput[]
    cursor?: ContributionRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContributionRuleScalarFieldEnum | ContributionRuleScalarFieldEnum[]
  }

  /**
   * User.penaltyRulesCreated
   */
  export type User$penaltyRulesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
    where?: PenaltyRuleWhereInput
    orderBy?: PenaltyRuleOrderByWithRelationInput | PenaltyRuleOrderByWithRelationInput[]
    cursor?: PenaltyRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PenaltyRuleScalarFieldEnum | PenaltyRuleScalarFieldEnum[]
  }

  /**
   * User.paymentsRecorded
   */
  export type User$paymentsRecordedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User.charitiesCreated
   */
  export type User$charitiesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
    where?: CharityWhereInput
    orderBy?: CharityOrderByWithRelationInput | CharityOrderByWithRelationInput[]
    cursor?: CharityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CharityScalarFieldEnum | CharityScalarFieldEnum[]
  }

  /**
   * User.loansCreated
   */
  export type User$loansCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * User.loansApproved
   */
  export type User$loansApprovedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * User.installmentsRecorded
   */
  export type User$installmentsRecordedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    where?: LoanInstallmentWhereInput
    orderBy?: LoanInstallmentOrderByWithRelationInput | LoanInstallmentOrderByWithRelationInput[]
    cursor?: LoanInstallmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanInstallmentScalarFieldEnum | LoanInstallmentScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  export type MemberMinAggregateOutputType = {
    id: string | null
    memberUid: string | null
    fullName: string | null
    phone: string | null
    email: string | null
    address: string | null
    joinDate: Date | null
    exitDate: Date | null
    status: $Enums.MemberStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberMaxAggregateOutputType = {
    id: string | null
    memberUid: string | null
    fullName: string | null
    phone: string | null
    email: string | null
    address: string | null
    joinDate: Date | null
    exitDate: Date | null
    status: $Enums.MemberStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberCountAggregateOutputType = {
    id: number
    memberUid: number
    fullName: number
    phone: number
    email: number
    address: number
    joinDate: number
    exitDate: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberMinAggregateInputType = {
    id?: true
    memberUid?: true
    fullName?: true
    phone?: true
    email?: true
    address?: true
    joinDate?: true
    exitDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberMaxAggregateInputType = {
    id?: true
    memberUid?: true
    fullName?: true
    phone?: true
    email?: true
    address?: true
    joinDate?: true
    exitDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberCountAggregateInputType = {
    id?: true
    memberUid?: true
    fullName?: true
    phone?: true
    email?: true
    address?: true
    joinDate?: true
    exitDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Member to aggregate.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Members
    **/
    _count?: true | MemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberMaxAggregateInputType
  }

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
        [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>
  }




  export type MemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithAggregationInput | MemberOrderByWithAggregationInput[]
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum
    having?: MemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCountAggregateInputType | true
    _min?: MemberMinAggregateInputType
    _max?: MemberMaxAggregateInputType
  }

  export type MemberGroupByOutputType = {
    id: string
    memberUid: string
    fullName: string
    phone: string | null
    email: string | null
    address: string | null
    joinDate: Date
    exitDate: Date | null
    status: $Enums.MemberStatus
    createdAt: Date
    updatedAt: Date
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>
        }
      >
    >


  export type MemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberUid?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    joinDate?: boolean
    exitDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    payments?: boolean | Member$paymentsArgs<ExtArgs>
    loans?: boolean | Member$loansArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberUid?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    joinDate?: boolean
    exitDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["member"]>

  export type MemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberUid?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    joinDate?: boolean
    exitDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["member"]>

  export type MemberSelectScalar = {
    id?: boolean
    memberUid?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    joinDate?: boolean
    exitDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberUid" | "fullName" | "phone" | "email" | "address" | "joinDate" | "exitDate" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["member"]>
  export type MemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | Member$paymentsArgs<ExtArgs>
    loans?: boolean | Member$loansArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Member"
    objects: {
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      loans: Prisma.$LoanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberUid: string
      fullName: string
      phone: string | null
      email: string | null
      address: string | null
      joinDate: Date
      exitDate: Date | null
      status: $Enums.MemberStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["member"]>
    composites: {}
  }

  type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = $Result.GetResult<Prisma.$MemberPayload, S>

  type MemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberCountAggregateInputType | true
    }

  export interface MemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Member'], meta: { name: 'Member' } }
    /**
     * Find zero or one Member that matches the filter.
     * @param {MemberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberFindUniqueArgs>(args: SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Member that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberFindFirstArgs>(args?: SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     * 
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberWithIdOnly = await prisma.member.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberFindManyArgs>(args?: SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Member.
     * @param {MemberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     * 
     */
    create<T extends MemberCreateArgs>(args: SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Members.
     * @param {MemberCreateManyArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberCreateManyArgs>(args?: SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Members and returns the data saved in the database.
     * @param {MemberCreateManyAndReturnArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Member.
     * @param {MemberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     * 
     */
    delete<T extends MemberDeleteArgs>(args: SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Member.
     * @param {MemberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberUpdateArgs>(args: SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Members.
     * @param {MemberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberDeleteManyArgs>(args?: SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberUpdateManyArgs>(args: SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members and returns the data updated in the database.
     * @param {MemberUpdateManyAndReturnArgs} args - Arguments to update many Members.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemberUpdateManyAndReturnArgs>(args: SelectSubset<T, MemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Member.
     * @param {MemberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
     */
    upsert<T extends MemberUpsertArgs>(args: SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
    **/
    count<T extends MemberCountArgs>(
      args?: Subset<T, MemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberAggregateArgs>(args: Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberGroupByArgs['orderBy'] }
        : { orderBy?: MemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Member model
   */
  readonly fields: MemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payments<T extends Member$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Member$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    loans<T extends Member$loansArgs<ExtArgs> = {}>(args?: Subset<T, Member$loansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Member model
   */
  interface MemberFieldRefs {
    readonly id: FieldRef<"Member", 'String'>
    readonly memberUid: FieldRef<"Member", 'String'>
    readonly fullName: FieldRef<"Member", 'String'>
    readonly phone: FieldRef<"Member", 'String'>
    readonly email: FieldRef<"Member", 'String'>
    readonly address: FieldRef<"Member", 'String'>
    readonly joinDate: FieldRef<"Member", 'DateTime'>
    readonly exitDate: FieldRef<"Member", 'DateTime'>
    readonly status: FieldRef<"Member", 'MemberStatus'>
    readonly createdAt: FieldRef<"Member", 'DateTime'>
    readonly updatedAt: FieldRef<"Member", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Member findUnique
   */
  export type MemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findUniqueOrThrow
   */
  export type MemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findFirst
   */
  export type MemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findFirstOrThrow
   */
  export type MemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findMany
   */
  export type MemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Members to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member create
   */
  export type MemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to create a Member.
     */
    data: XOR<MemberCreateInput, MemberUncheckedCreateInput>
  }

  /**
   * Member createMany
   */
  export type MemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Member createManyAndReturn
   */
  export type MemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Member update
   */
  export type MemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to update a Member.
     */
    data: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
    /**
     * Choose, which Member to update.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member updateMany
   */
  export type MemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to update.
     */
    limit?: number
  }

  /**
   * Member updateManyAndReturn
   */
  export type MemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to update.
     */
    limit?: number
  }

  /**
   * Member upsert
   */
  export type MemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The filter to search for the Member to update in case it exists.
     */
    where: MemberWhereUniqueInput
    /**
     * In case the Member found by the `where` argument doesn't exist, create a new Member with this data.
     */
    create: XOR<MemberCreateInput, MemberUncheckedCreateInput>
    /**
     * In case the Member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
  }

  /**
   * Member delete
   */
  export type MemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter which Member to delete.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member deleteMany
   */
  export type MemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Members to delete
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to delete.
     */
    limit?: number
  }

  /**
   * Member.payments
   */
  export type Member$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Member.loans
   */
  export type Member$loansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Member without action
   */
  export type MemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
  }


  /**
   * Model ContributionRule
   */

  export type AggregateContributionRule = {
    _count: ContributionRuleCountAggregateOutputType | null
    _avg: ContributionRuleAvgAggregateOutputType | null
    _sum: ContributionRuleSumAggregateOutputType | null
    _min: ContributionRuleMinAggregateOutputType | null
    _max: ContributionRuleMaxAggregateOutputType | null
  }

  export type ContributionRuleAvgAggregateOutputType = {
    amountPaise: number | null
    effectiveFromMonth: number | null
    effectiveFromYear: number | null
  }

  export type ContributionRuleSumAggregateOutputType = {
    amountPaise: number | null
    effectiveFromMonth: number | null
    effectiveFromYear: number | null
  }

  export type ContributionRuleMinAggregateOutputType = {
    id: string | null
    amountPaise: number | null
    effectiveFromMonth: number | null
    effectiveFromYear: number | null
    createdById: string | null
    createdAt: Date | null
  }

  export type ContributionRuleMaxAggregateOutputType = {
    id: string | null
    amountPaise: number | null
    effectiveFromMonth: number | null
    effectiveFromYear: number | null
    createdById: string | null
    createdAt: Date | null
  }

  export type ContributionRuleCountAggregateOutputType = {
    id: number
    amountPaise: number
    effectiveFromMonth: number
    effectiveFromYear: number
    createdById: number
    createdAt: number
    _all: number
  }


  export type ContributionRuleAvgAggregateInputType = {
    amountPaise?: true
    effectiveFromMonth?: true
    effectiveFromYear?: true
  }

  export type ContributionRuleSumAggregateInputType = {
    amountPaise?: true
    effectiveFromMonth?: true
    effectiveFromYear?: true
  }

  export type ContributionRuleMinAggregateInputType = {
    id?: true
    amountPaise?: true
    effectiveFromMonth?: true
    effectiveFromYear?: true
    createdById?: true
    createdAt?: true
  }

  export type ContributionRuleMaxAggregateInputType = {
    id?: true
    amountPaise?: true
    effectiveFromMonth?: true
    effectiveFromYear?: true
    createdById?: true
    createdAt?: true
  }

  export type ContributionRuleCountAggregateInputType = {
    id?: true
    amountPaise?: true
    effectiveFromMonth?: true
    effectiveFromYear?: true
    createdById?: true
    createdAt?: true
    _all?: true
  }

  export type ContributionRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContributionRule to aggregate.
     */
    where?: ContributionRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributionRules to fetch.
     */
    orderBy?: ContributionRuleOrderByWithRelationInput | ContributionRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContributionRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributionRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributionRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContributionRules
    **/
    _count?: true | ContributionRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContributionRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContributionRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContributionRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContributionRuleMaxAggregateInputType
  }

  export type GetContributionRuleAggregateType<T extends ContributionRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateContributionRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContributionRule[P]>
      : GetScalarType<T[P], AggregateContributionRule[P]>
  }




  export type ContributionRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContributionRuleWhereInput
    orderBy?: ContributionRuleOrderByWithAggregationInput | ContributionRuleOrderByWithAggregationInput[]
    by: ContributionRuleScalarFieldEnum[] | ContributionRuleScalarFieldEnum
    having?: ContributionRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContributionRuleCountAggregateInputType | true
    _avg?: ContributionRuleAvgAggregateInputType
    _sum?: ContributionRuleSumAggregateInputType
    _min?: ContributionRuleMinAggregateInputType
    _max?: ContributionRuleMaxAggregateInputType
  }

  export type ContributionRuleGroupByOutputType = {
    id: string
    amountPaise: number
    effectiveFromMonth: number
    effectiveFromYear: number
    createdById: string
    createdAt: Date
    _count: ContributionRuleCountAggregateOutputType | null
    _avg: ContributionRuleAvgAggregateOutputType | null
    _sum: ContributionRuleSumAggregateOutputType | null
    _min: ContributionRuleMinAggregateOutputType | null
    _max: ContributionRuleMaxAggregateOutputType | null
  }

  type GetContributionRuleGroupByPayload<T extends ContributionRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContributionRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContributionRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContributionRuleGroupByOutputType[P]>
            : GetScalarType<T[P], ContributionRuleGroupByOutputType[P]>
        }
      >
    >


  export type ContributionRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountPaise?: boolean
    effectiveFromMonth?: boolean
    effectiveFromYear?: boolean
    createdById?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contributionRule"]>

  export type ContributionRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountPaise?: boolean
    effectiveFromMonth?: boolean
    effectiveFromYear?: boolean
    createdById?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contributionRule"]>

  export type ContributionRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountPaise?: boolean
    effectiveFromMonth?: boolean
    effectiveFromYear?: boolean
    createdById?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contributionRule"]>

  export type ContributionRuleSelectScalar = {
    id?: boolean
    amountPaise?: boolean
    effectiveFromMonth?: boolean
    effectiveFromYear?: boolean
    createdById?: boolean
    createdAt?: boolean
  }

  export type ContributionRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amountPaise" | "effectiveFromMonth" | "effectiveFromYear" | "createdById" | "createdAt", ExtArgs["result"]["contributionRule"]>
  export type ContributionRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContributionRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContributionRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ContributionRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContributionRule"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amountPaise: number
      effectiveFromMonth: number
      effectiveFromYear: number
      createdById: string
      createdAt: Date
    }, ExtArgs["result"]["contributionRule"]>
    composites: {}
  }

  type ContributionRuleGetPayload<S extends boolean | null | undefined | ContributionRuleDefaultArgs> = $Result.GetResult<Prisma.$ContributionRulePayload, S>

  type ContributionRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContributionRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContributionRuleCountAggregateInputType | true
    }

  export interface ContributionRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContributionRule'], meta: { name: 'ContributionRule' } }
    /**
     * Find zero or one ContributionRule that matches the filter.
     * @param {ContributionRuleFindUniqueArgs} args - Arguments to find a ContributionRule
     * @example
     * // Get one ContributionRule
     * const contributionRule = await prisma.contributionRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContributionRuleFindUniqueArgs>(args: SelectSubset<T, ContributionRuleFindUniqueArgs<ExtArgs>>): Prisma__ContributionRuleClient<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContributionRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContributionRuleFindUniqueOrThrowArgs} args - Arguments to find a ContributionRule
     * @example
     * // Get one ContributionRule
     * const contributionRule = await prisma.contributionRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContributionRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, ContributionRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContributionRuleClient<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContributionRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributionRuleFindFirstArgs} args - Arguments to find a ContributionRule
     * @example
     * // Get one ContributionRule
     * const contributionRule = await prisma.contributionRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContributionRuleFindFirstArgs>(args?: SelectSubset<T, ContributionRuleFindFirstArgs<ExtArgs>>): Prisma__ContributionRuleClient<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContributionRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributionRuleFindFirstOrThrowArgs} args - Arguments to find a ContributionRule
     * @example
     * // Get one ContributionRule
     * const contributionRule = await prisma.contributionRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContributionRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, ContributionRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContributionRuleClient<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContributionRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributionRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContributionRules
     * const contributionRules = await prisma.contributionRule.findMany()
     * 
     * // Get first 10 ContributionRules
     * const contributionRules = await prisma.contributionRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contributionRuleWithIdOnly = await prisma.contributionRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContributionRuleFindManyArgs>(args?: SelectSubset<T, ContributionRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContributionRule.
     * @param {ContributionRuleCreateArgs} args - Arguments to create a ContributionRule.
     * @example
     * // Create one ContributionRule
     * const ContributionRule = await prisma.contributionRule.create({
     *   data: {
     *     // ... data to create a ContributionRule
     *   }
     * })
     * 
     */
    create<T extends ContributionRuleCreateArgs>(args: SelectSubset<T, ContributionRuleCreateArgs<ExtArgs>>): Prisma__ContributionRuleClient<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContributionRules.
     * @param {ContributionRuleCreateManyArgs} args - Arguments to create many ContributionRules.
     * @example
     * // Create many ContributionRules
     * const contributionRule = await prisma.contributionRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContributionRuleCreateManyArgs>(args?: SelectSubset<T, ContributionRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContributionRules and returns the data saved in the database.
     * @param {ContributionRuleCreateManyAndReturnArgs} args - Arguments to create many ContributionRules.
     * @example
     * // Create many ContributionRules
     * const contributionRule = await prisma.contributionRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContributionRules and only return the `id`
     * const contributionRuleWithIdOnly = await prisma.contributionRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContributionRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, ContributionRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContributionRule.
     * @param {ContributionRuleDeleteArgs} args - Arguments to delete one ContributionRule.
     * @example
     * // Delete one ContributionRule
     * const ContributionRule = await prisma.contributionRule.delete({
     *   where: {
     *     // ... filter to delete one ContributionRule
     *   }
     * })
     * 
     */
    delete<T extends ContributionRuleDeleteArgs>(args: SelectSubset<T, ContributionRuleDeleteArgs<ExtArgs>>): Prisma__ContributionRuleClient<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContributionRule.
     * @param {ContributionRuleUpdateArgs} args - Arguments to update one ContributionRule.
     * @example
     * // Update one ContributionRule
     * const contributionRule = await prisma.contributionRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContributionRuleUpdateArgs>(args: SelectSubset<T, ContributionRuleUpdateArgs<ExtArgs>>): Prisma__ContributionRuleClient<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContributionRules.
     * @param {ContributionRuleDeleteManyArgs} args - Arguments to filter ContributionRules to delete.
     * @example
     * // Delete a few ContributionRules
     * const { count } = await prisma.contributionRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContributionRuleDeleteManyArgs>(args?: SelectSubset<T, ContributionRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContributionRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributionRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContributionRules
     * const contributionRule = await prisma.contributionRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContributionRuleUpdateManyArgs>(args: SelectSubset<T, ContributionRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContributionRules and returns the data updated in the database.
     * @param {ContributionRuleUpdateManyAndReturnArgs} args - Arguments to update many ContributionRules.
     * @example
     * // Update many ContributionRules
     * const contributionRule = await prisma.contributionRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContributionRules and only return the `id`
     * const contributionRuleWithIdOnly = await prisma.contributionRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContributionRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, ContributionRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContributionRule.
     * @param {ContributionRuleUpsertArgs} args - Arguments to update or create a ContributionRule.
     * @example
     * // Update or create a ContributionRule
     * const contributionRule = await prisma.contributionRule.upsert({
     *   create: {
     *     // ... data to create a ContributionRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContributionRule we want to update
     *   }
     * })
     */
    upsert<T extends ContributionRuleUpsertArgs>(args: SelectSubset<T, ContributionRuleUpsertArgs<ExtArgs>>): Prisma__ContributionRuleClient<$Result.GetResult<Prisma.$ContributionRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContributionRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributionRuleCountArgs} args - Arguments to filter ContributionRules to count.
     * @example
     * // Count the number of ContributionRules
     * const count = await prisma.contributionRule.count({
     *   where: {
     *     // ... the filter for the ContributionRules we want to count
     *   }
     * })
    **/
    count<T extends ContributionRuleCountArgs>(
      args?: Subset<T, ContributionRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContributionRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContributionRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributionRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContributionRuleAggregateArgs>(args: Subset<T, ContributionRuleAggregateArgs>): Prisma.PrismaPromise<GetContributionRuleAggregateType<T>>

    /**
     * Group by ContributionRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContributionRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContributionRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContributionRuleGroupByArgs['orderBy'] }
        : { orderBy?: ContributionRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContributionRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContributionRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContributionRule model
   */
  readonly fields: ContributionRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContributionRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContributionRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContributionRule model
   */
  interface ContributionRuleFieldRefs {
    readonly id: FieldRef<"ContributionRule", 'String'>
    readonly amountPaise: FieldRef<"ContributionRule", 'Int'>
    readonly effectiveFromMonth: FieldRef<"ContributionRule", 'Int'>
    readonly effectiveFromYear: FieldRef<"ContributionRule", 'Int'>
    readonly createdById: FieldRef<"ContributionRule", 'String'>
    readonly createdAt: FieldRef<"ContributionRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContributionRule findUnique
   */
  export type ContributionRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
    /**
     * Filter, which ContributionRule to fetch.
     */
    where: ContributionRuleWhereUniqueInput
  }

  /**
   * ContributionRule findUniqueOrThrow
   */
  export type ContributionRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
    /**
     * Filter, which ContributionRule to fetch.
     */
    where: ContributionRuleWhereUniqueInput
  }

  /**
   * ContributionRule findFirst
   */
  export type ContributionRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
    /**
     * Filter, which ContributionRule to fetch.
     */
    where?: ContributionRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributionRules to fetch.
     */
    orderBy?: ContributionRuleOrderByWithRelationInput | ContributionRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContributionRules.
     */
    cursor?: ContributionRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributionRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributionRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContributionRules.
     */
    distinct?: ContributionRuleScalarFieldEnum | ContributionRuleScalarFieldEnum[]
  }

  /**
   * ContributionRule findFirstOrThrow
   */
  export type ContributionRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
    /**
     * Filter, which ContributionRule to fetch.
     */
    where?: ContributionRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributionRules to fetch.
     */
    orderBy?: ContributionRuleOrderByWithRelationInput | ContributionRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContributionRules.
     */
    cursor?: ContributionRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributionRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributionRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContributionRules.
     */
    distinct?: ContributionRuleScalarFieldEnum | ContributionRuleScalarFieldEnum[]
  }

  /**
   * ContributionRule findMany
   */
  export type ContributionRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
    /**
     * Filter, which ContributionRules to fetch.
     */
    where?: ContributionRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContributionRules to fetch.
     */
    orderBy?: ContributionRuleOrderByWithRelationInput | ContributionRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContributionRules.
     */
    cursor?: ContributionRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContributionRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContributionRules.
     */
    skip?: number
    distinct?: ContributionRuleScalarFieldEnum | ContributionRuleScalarFieldEnum[]
  }

  /**
   * ContributionRule create
   */
  export type ContributionRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a ContributionRule.
     */
    data: XOR<ContributionRuleCreateInput, ContributionRuleUncheckedCreateInput>
  }

  /**
   * ContributionRule createMany
   */
  export type ContributionRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContributionRules.
     */
    data: ContributionRuleCreateManyInput | ContributionRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContributionRule createManyAndReturn
   */
  export type ContributionRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * The data used to create many ContributionRules.
     */
    data: ContributionRuleCreateManyInput | ContributionRuleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContributionRule update
   */
  export type ContributionRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a ContributionRule.
     */
    data: XOR<ContributionRuleUpdateInput, ContributionRuleUncheckedUpdateInput>
    /**
     * Choose, which ContributionRule to update.
     */
    where: ContributionRuleWhereUniqueInput
  }

  /**
   * ContributionRule updateMany
   */
  export type ContributionRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContributionRules.
     */
    data: XOR<ContributionRuleUpdateManyMutationInput, ContributionRuleUncheckedUpdateManyInput>
    /**
     * Filter which ContributionRules to update
     */
    where?: ContributionRuleWhereInput
    /**
     * Limit how many ContributionRules to update.
     */
    limit?: number
  }

  /**
   * ContributionRule updateManyAndReturn
   */
  export type ContributionRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * The data used to update ContributionRules.
     */
    data: XOR<ContributionRuleUpdateManyMutationInput, ContributionRuleUncheckedUpdateManyInput>
    /**
     * Filter which ContributionRules to update
     */
    where?: ContributionRuleWhereInput
    /**
     * Limit how many ContributionRules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContributionRule upsert
   */
  export type ContributionRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the ContributionRule to update in case it exists.
     */
    where: ContributionRuleWhereUniqueInput
    /**
     * In case the ContributionRule found by the `where` argument doesn't exist, create a new ContributionRule with this data.
     */
    create: XOR<ContributionRuleCreateInput, ContributionRuleUncheckedCreateInput>
    /**
     * In case the ContributionRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContributionRuleUpdateInput, ContributionRuleUncheckedUpdateInput>
  }

  /**
   * ContributionRule delete
   */
  export type ContributionRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
    /**
     * Filter which ContributionRule to delete.
     */
    where: ContributionRuleWhereUniqueInput
  }

  /**
   * ContributionRule deleteMany
   */
  export type ContributionRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContributionRules to delete
     */
    where?: ContributionRuleWhereInput
    /**
     * Limit how many ContributionRules to delete.
     */
    limit?: number
  }

  /**
   * ContributionRule without action
   */
  export type ContributionRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContributionRule
     */
    select?: ContributionRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContributionRule
     */
    omit?: ContributionRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContributionRuleInclude<ExtArgs> | null
  }


  /**
   * Model PenaltyRule
   */

  export type AggregatePenaltyRule = {
    _count: PenaltyRuleCountAggregateOutputType | null
    _avg: PenaltyRuleAvgAggregateOutputType | null
    _sum: PenaltyRuleSumAggregateOutputType | null
    _min: PenaltyRuleMinAggregateOutputType | null
    _max: PenaltyRuleMaxAggregateOutputType | null
  }

  export type PenaltyRuleAvgAggregateOutputType = {
    amountPaise: number | null
  }

  export type PenaltyRuleSumAggregateOutputType = {
    amountPaise: number | null
  }

  export type PenaltyRuleMinAggregateOutputType = {
    id: string | null
    amountPaise: number | null
    effectiveFrom: Date | null
    createdById: string | null
    createdAt: Date | null
  }

  export type PenaltyRuleMaxAggregateOutputType = {
    id: string | null
    amountPaise: number | null
    effectiveFrom: Date | null
    createdById: string | null
    createdAt: Date | null
  }

  export type PenaltyRuleCountAggregateOutputType = {
    id: number
    amountPaise: number
    effectiveFrom: number
    createdById: number
    createdAt: number
    _all: number
  }


  export type PenaltyRuleAvgAggregateInputType = {
    amountPaise?: true
  }

  export type PenaltyRuleSumAggregateInputType = {
    amountPaise?: true
  }

  export type PenaltyRuleMinAggregateInputType = {
    id?: true
    amountPaise?: true
    effectiveFrom?: true
    createdById?: true
    createdAt?: true
  }

  export type PenaltyRuleMaxAggregateInputType = {
    id?: true
    amountPaise?: true
    effectiveFrom?: true
    createdById?: true
    createdAt?: true
  }

  export type PenaltyRuleCountAggregateInputType = {
    id?: true
    amountPaise?: true
    effectiveFrom?: true
    createdById?: true
    createdAt?: true
    _all?: true
  }

  export type PenaltyRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PenaltyRule to aggregate.
     */
    where?: PenaltyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PenaltyRules to fetch.
     */
    orderBy?: PenaltyRuleOrderByWithRelationInput | PenaltyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PenaltyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PenaltyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PenaltyRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PenaltyRules
    **/
    _count?: true | PenaltyRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PenaltyRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PenaltyRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PenaltyRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PenaltyRuleMaxAggregateInputType
  }

  export type GetPenaltyRuleAggregateType<T extends PenaltyRuleAggregateArgs> = {
        [P in keyof T & keyof AggregatePenaltyRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePenaltyRule[P]>
      : GetScalarType<T[P], AggregatePenaltyRule[P]>
  }




  export type PenaltyRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PenaltyRuleWhereInput
    orderBy?: PenaltyRuleOrderByWithAggregationInput | PenaltyRuleOrderByWithAggregationInput[]
    by: PenaltyRuleScalarFieldEnum[] | PenaltyRuleScalarFieldEnum
    having?: PenaltyRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PenaltyRuleCountAggregateInputType | true
    _avg?: PenaltyRuleAvgAggregateInputType
    _sum?: PenaltyRuleSumAggregateInputType
    _min?: PenaltyRuleMinAggregateInputType
    _max?: PenaltyRuleMaxAggregateInputType
  }

  export type PenaltyRuleGroupByOutputType = {
    id: string
    amountPaise: number
    effectiveFrom: Date
    createdById: string
    createdAt: Date
    _count: PenaltyRuleCountAggregateOutputType | null
    _avg: PenaltyRuleAvgAggregateOutputType | null
    _sum: PenaltyRuleSumAggregateOutputType | null
    _min: PenaltyRuleMinAggregateOutputType | null
    _max: PenaltyRuleMaxAggregateOutputType | null
  }

  type GetPenaltyRuleGroupByPayload<T extends PenaltyRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PenaltyRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PenaltyRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PenaltyRuleGroupByOutputType[P]>
            : GetScalarType<T[P], PenaltyRuleGroupByOutputType[P]>
        }
      >
    >


  export type PenaltyRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountPaise?: boolean
    effectiveFrom?: boolean
    createdById?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["penaltyRule"]>

  export type PenaltyRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountPaise?: boolean
    effectiveFrom?: boolean
    createdById?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["penaltyRule"]>

  export type PenaltyRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountPaise?: boolean
    effectiveFrom?: boolean
    createdById?: boolean
    createdAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["penaltyRule"]>

  export type PenaltyRuleSelectScalar = {
    id?: boolean
    amountPaise?: boolean
    effectiveFrom?: boolean
    createdById?: boolean
    createdAt?: boolean
  }

  export type PenaltyRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amountPaise" | "effectiveFrom" | "createdById" | "createdAt", ExtArgs["result"]["penaltyRule"]>
  export type PenaltyRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PenaltyRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PenaltyRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PenaltyRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PenaltyRule"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amountPaise: number
      effectiveFrom: Date
      createdById: string
      createdAt: Date
    }, ExtArgs["result"]["penaltyRule"]>
    composites: {}
  }

  type PenaltyRuleGetPayload<S extends boolean | null | undefined | PenaltyRuleDefaultArgs> = $Result.GetResult<Prisma.$PenaltyRulePayload, S>

  type PenaltyRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PenaltyRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PenaltyRuleCountAggregateInputType | true
    }

  export interface PenaltyRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PenaltyRule'], meta: { name: 'PenaltyRule' } }
    /**
     * Find zero or one PenaltyRule that matches the filter.
     * @param {PenaltyRuleFindUniqueArgs} args - Arguments to find a PenaltyRule
     * @example
     * // Get one PenaltyRule
     * const penaltyRule = await prisma.penaltyRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PenaltyRuleFindUniqueArgs>(args: SelectSubset<T, PenaltyRuleFindUniqueArgs<ExtArgs>>): Prisma__PenaltyRuleClient<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PenaltyRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PenaltyRuleFindUniqueOrThrowArgs} args - Arguments to find a PenaltyRule
     * @example
     * // Get one PenaltyRule
     * const penaltyRule = await prisma.penaltyRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PenaltyRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, PenaltyRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PenaltyRuleClient<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PenaltyRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenaltyRuleFindFirstArgs} args - Arguments to find a PenaltyRule
     * @example
     * // Get one PenaltyRule
     * const penaltyRule = await prisma.penaltyRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PenaltyRuleFindFirstArgs>(args?: SelectSubset<T, PenaltyRuleFindFirstArgs<ExtArgs>>): Prisma__PenaltyRuleClient<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PenaltyRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenaltyRuleFindFirstOrThrowArgs} args - Arguments to find a PenaltyRule
     * @example
     * // Get one PenaltyRule
     * const penaltyRule = await prisma.penaltyRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PenaltyRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, PenaltyRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PenaltyRuleClient<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PenaltyRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenaltyRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PenaltyRules
     * const penaltyRules = await prisma.penaltyRule.findMany()
     * 
     * // Get first 10 PenaltyRules
     * const penaltyRules = await prisma.penaltyRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const penaltyRuleWithIdOnly = await prisma.penaltyRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PenaltyRuleFindManyArgs>(args?: SelectSubset<T, PenaltyRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PenaltyRule.
     * @param {PenaltyRuleCreateArgs} args - Arguments to create a PenaltyRule.
     * @example
     * // Create one PenaltyRule
     * const PenaltyRule = await prisma.penaltyRule.create({
     *   data: {
     *     // ... data to create a PenaltyRule
     *   }
     * })
     * 
     */
    create<T extends PenaltyRuleCreateArgs>(args: SelectSubset<T, PenaltyRuleCreateArgs<ExtArgs>>): Prisma__PenaltyRuleClient<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PenaltyRules.
     * @param {PenaltyRuleCreateManyArgs} args - Arguments to create many PenaltyRules.
     * @example
     * // Create many PenaltyRules
     * const penaltyRule = await prisma.penaltyRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PenaltyRuleCreateManyArgs>(args?: SelectSubset<T, PenaltyRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PenaltyRules and returns the data saved in the database.
     * @param {PenaltyRuleCreateManyAndReturnArgs} args - Arguments to create many PenaltyRules.
     * @example
     * // Create many PenaltyRules
     * const penaltyRule = await prisma.penaltyRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PenaltyRules and only return the `id`
     * const penaltyRuleWithIdOnly = await prisma.penaltyRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PenaltyRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, PenaltyRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PenaltyRule.
     * @param {PenaltyRuleDeleteArgs} args - Arguments to delete one PenaltyRule.
     * @example
     * // Delete one PenaltyRule
     * const PenaltyRule = await prisma.penaltyRule.delete({
     *   where: {
     *     // ... filter to delete one PenaltyRule
     *   }
     * })
     * 
     */
    delete<T extends PenaltyRuleDeleteArgs>(args: SelectSubset<T, PenaltyRuleDeleteArgs<ExtArgs>>): Prisma__PenaltyRuleClient<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PenaltyRule.
     * @param {PenaltyRuleUpdateArgs} args - Arguments to update one PenaltyRule.
     * @example
     * // Update one PenaltyRule
     * const penaltyRule = await prisma.penaltyRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PenaltyRuleUpdateArgs>(args: SelectSubset<T, PenaltyRuleUpdateArgs<ExtArgs>>): Prisma__PenaltyRuleClient<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PenaltyRules.
     * @param {PenaltyRuleDeleteManyArgs} args - Arguments to filter PenaltyRules to delete.
     * @example
     * // Delete a few PenaltyRules
     * const { count } = await prisma.penaltyRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PenaltyRuleDeleteManyArgs>(args?: SelectSubset<T, PenaltyRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PenaltyRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenaltyRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PenaltyRules
     * const penaltyRule = await prisma.penaltyRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PenaltyRuleUpdateManyArgs>(args: SelectSubset<T, PenaltyRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PenaltyRules and returns the data updated in the database.
     * @param {PenaltyRuleUpdateManyAndReturnArgs} args - Arguments to update many PenaltyRules.
     * @example
     * // Update many PenaltyRules
     * const penaltyRule = await prisma.penaltyRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PenaltyRules and only return the `id`
     * const penaltyRuleWithIdOnly = await prisma.penaltyRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PenaltyRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, PenaltyRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PenaltyRule.
     * @param {PenaltyRuleUpsertArgs} args - Arguments to update or create a PenaltyRule.
     * @example
     * // Update or create a PenaltyRule
     * const penaltyRule = await prisma.penaltyRule.upsert({
     *   create: {
     *     // ... data to create a PenaltyRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PenaltyRule we want to update
     *   }
     * })
     */
    upsert<T extends PenaltyRuleUpsertArgs>(args: SelectSubset<T, PenaltyRuleUpsertArgs<ExtArgs>>): Prisma__PenaltyRuleClient<$Result.GetResult<Prisma.$PenaltyRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PenaltyRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenaltyRuleCountArgs} args - Arguments to filter PenaltyRules to count.
     * @example
     * // Count the number of PenaltyRules
     * const count = await prisma.penaltyRule.count({
     *   where: {
     *     // ... the filter for the PenaltyRules we want to count
     *   }
     * })
    **/
    count<T extends PenaltyRuleCountArgs>(
      args?: Subset<T, PenaltyRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PenaltyRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PenaltyRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenaltyRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PenaltyRuleAggregateArgs>(args: Subset<T, PenaltyRuleAggregateArgs>): Prisma.PrismaPromise<GetPenaltyRuleAggregateType<T>>

    /**
     * Group by PenaltyRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PenaltyRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PenaltyRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PenaltyRuleGroupByArgs['orderBy'] }
        : { orderBy?: PenaltyRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PenaltyRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPenaltyRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PenaltyRule model
   */
  readonly fields: PenaltyRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PenaltyRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PenaltyRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PenaltyRule model
   */
  interface PenaltyRuleFieldRefs {
    readonly id: FieldRef<"PenaltyRule", 'String'>
    readonly amountPaise: FieldRef<"PenaltyRule", 'Int'>
    readonly effectiveFrom: FieldRef<"PenaltyRule", 'DateTime'>
    readonly createdById: FieldRef<"PenaltyRule", 'String'>
    readonly createdAt: FieldRef<"PenaltyRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PenaltyRule findUnique
   */
  export type PenaltyRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PenaltyRule to fetch.
     */
    where: PenaltyRuleWhereUniqueInput
  }

  /**
   * PenaltyRule findUniqueOrThrow
   */
  export type PenaltyRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PenaltyRule to fetch.
     */
    where: PenaltyRuleWhereUniqueInput
  }

  /**
   * PenaltyRule findFirst
   */
  export type PenaltyRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PenaltyRule to fetch.
     */
    where?: PenaltyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PenaltyRules to fetch.
     */
    orderBy?: PenaltyRuleOrderByWithRelationInput | PenaltyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PenaltyRules.
     */
    cursor?: PenaltyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PenaltyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PenaltyRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PenaltyRules.
     */
    distinct?: PenaltyRuleScalarFieldEnum | PenaltyRuleScalarFieldEnum[]
  }

  /**
   * PenaltyRule findFirstOrThrow
   */
  export type PenaltyRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PenaltyRule to fetch.
     */
    where?: PenaltyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PenaltyRules to fetch.
     */
    orderBy?: PenaltyRuleOrderByWithRelationInput | PenaltyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PenaltyRules.
     */
    cursor?: PenaltyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PenaltyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PenaltyRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PenaltyRules.
     */
    distinct?: PenaltyRuleScalarFieldEnum | PenaltyRuleScalarFieldEnum[]
  }

  /**
   * PenaltyRule findMany
   */
  export type PenaltyRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
    /**
     * Filter, which PenaltyRules to fetch.
     */
    where?: PenaltyRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PenaltyRules to fetch.
     */
    orderBy?: PenaltyRuleOrderByWithRelationInput | PenaltyRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PenaltyRules.
     */
    cursor?: PenaltyRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PenaltyRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PenaltyRules.
     */
    skip?: number
    distinct?: PenaltyRuleScalarFieldEnum | PenaltyRuleScalarFieldEnum[]
  }

  /**
   * PenaltyRule create
   */
  export type PenaltyRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a PenaltyRule.
     */
    data: XOR<PenaltyRuleCreateInput, PenaltyRuleUncheckedCreateInput>
  }

  /**
   * PenaltyRule createMany
   */
  export type PenaltyRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PenaltyRules.
     */
    data: PenaltyRuleCreateManyInput | PenaltyRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PenaltyRule createManyAndReturn
   */
  export type PenaltyRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * The data used to create many PenaltyRules.
     */
    data: PenaltyRuleCreateManyInput | PenaltyRuleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PenaltyRule update
   */
  export type PenaltyRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a PenaltyRule.
     */
    data: XOR<PenaltyRuleUpdateInput, PenaltyRuleUncheckedUpdateInput>
    /**
     * Choose, which PenaltyRule to update.
     */
    where: PenaltyRuleWhereUniqueInput
  }

  /**
   * PenaltyRule updateMany
   */
  export type PenaltyRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PenaltyRules.
     */
    data: XOR<PenaltyRuleUpdateManyMutationInput, PenaltyRuleUncheckedUpdateManyInput>
    /**
     * Filter which PenaltyRules to update
     */
    where?: PenaltyRuleWhereInput
    /**
     * Limit how many PenaltyRules to update.
     */
    limit?: number
  }

  /**
   * PenaltyRule updateManyAndReturn
   */
  export type PenaltyRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * The data used to update PenaltyRules.
     */
    data: XOR<PenaltyRuleUpdateManyMutationInput, PenaltyRuleUncheckedUpdateManyInput>
    /**
     * Filter which PenaltyRules to update
     */
    where?: PenaltyRuleWhereInput
    /**
     * Limit how many PenaltyRules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PenaltyRule upsert
   */
  export type PenaltyRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the PenaltyRule to update in case it exists.
     */
    where: PenaltyRuleWhereUniqueInput
    /**
     * In case the PenaltyRule found by the `where` argument doesn't exist, create a new PenaltyRule with this data.
     */
    create: XOR<PenaltyRuleCreateInput, PenaltyRuleUncheckedCreateInput>
    /**
     * In case the PenaltyRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PenaltyRuleUpdateInput, PenaltyRuleUncheckedUpdateInput>
  }

  /**
   * PenaltyRule delete
   */
  export type PenaltyRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
    /**
     * Filter which PenaltyRule to delete.
     */
    where: PenaltyRuleWhereUniqueInput
  }

  /**
   * PenaltyRule deleteMany
   */
  export type PenaltyRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PenaltyRules to delete
     */
    where?: PenaltyRuleWhereInput
    /**
     * Limit how many PenaltyRules to delete.
     */
    limit?: number
  }

  /**
   * PenaltyRule without action
   */
  export type PenaltyRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PenaltyRule
     */
    select?: PenaltyRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PenaltyRule
     */
    omit?: PenaltyRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PenaltyRuleInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    month: number | null
    year: number | null
    baseAmountPaise: number | null
    penaltyAmountPaise: number | null
    totalAmountPaise: number | null
  }

  export type PaymentSumAggregateOutputType = {
    month: number | null
    year: number | null
    baseAmountPaise: number | null
    penaltyAmountPaise: number | null
    totalAmountPaise: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    month: number | null
    year: number | null
    baseAmountPaise: number | null
    penaltyAmountPaise: number | null
    totalAmountPaise: number | null
    status: $Enums.PaymentStatus | null
    paymentMethod: $Enums.PaymentMethod | null
    paidAt: Date | null
    recordedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    month: number | null
    year: number | null
    baseAmountPaise: number | null
    penaltyAmountPaise: number | null
    totalAmountPaise: number | null
    status: $Enums.PaymentStatus | null
    paymentMethod: $Enums.PaymentMethod | null
    paidAt: Date | null
    recordedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    memberId: number
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise: number
    totalAmountPaise: number
    status: number
    paymentMethod: number
    paidAt: number
    recordedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    month?: true
    year?: true
    baseAmountPaise?: true
    penaltyAmountPaise?: true
    totalAmountPaise?: true
  }

  export type PaymentSumAggregateInputType = {
    month?: true
    year?: true
    baseAmountPaise?: true
    penaltyAmountPaise?: true
    totalAmountPaise?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    memberId?: true
    month?: true
    year?: true
    baseAmountPaise?: true
    penaltyAmountPaise?: true
    totalAmountPaise?: true
    status?: true
    paymentMethod?: true
    paidAt?: true
    recordedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    memberId?: true
    month?: true
    year?: true
    baseAmountPaise?: true
    penaltyAmountPaise?: true
    totalAmountPaise?: true
    status?: true
    paymentMethod?: true
    paidAt?: true
    recordedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    memberId?: true
    month?: true
    year?: true
    baseAmountPaise?: true
    penaltyAmountPaise?: true
    totalAmountPaise?: true
    status?: true
    paymentMethod?: true
    paidAt?: true
    recordedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    memberId: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise: number
    totalAmountPaise: number
    status: $Enums.PaymentStatus
    paymentMethod: $Enums.PaymentMethod | null
    paidAt: Date | null
    recordedById: string
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    month?: boolean
    year?: boolean
    baseAmountPaise?: boolean
    penaltyAmountPaise?: boolean
    totalAmountPaise?: boolean
    status?: boolean
    paymentMethod?: boolean
    paidAt?: boolean
    recordedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    recordedBy?: boolean | UserDefaultArgs<ExtArgs>
    receipt?: boolean | Payment$receiptArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    month?: boolean
    year?: boolean
    baseAmountPaise?: boolean
    penaltyAmountPaise?: boolean
    totalAmountPaise?: boolean
    status?: boolean
    paymentMethod?: boolean
    paidAt?: boolean
    recordedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    recordedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    month?: boolean
    year?: boolean
    baseAmountPaise?: boolean
    penaltyAmountPaise?: boolean
    totalAmountPaise?: boolean
    status?: boolean
    paymentMethod?: boolean
    paidAt?: boolean
    recordedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    recordedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    memberId?: boolean
    month?: boolean
    year?: boolean
    baseAmountPaise?: boolean
    penaltyAmountPaise?: boolean
    totalAmountPaise?: boolean
    status?: boolean
    paymentMethod?: boolean
    paidAt?: boolean
    recordedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberId" | "month" | "year" | "baseAmountPaise" | "penaltyAmountPaise" | "totalAmountPaise" | "status" | "paymentMethod" | "paidAt" | "recordedById" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    recordedBy?: boolean | UserDefaultArgs<ExtArgs>
    receipt?: boolean | Payment$receiptArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    recordedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    recordedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs>
      recordedBy: Prisma.$UserPayload<ExtArgs>
      receipt: Prisma.$ReceiptPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      month: number
      year: number
      baseAmountPaise: number
      penaltyAmountPaise: number
      totalAmountPaise: number
      status: $Enums.PaymentStatus
      paymentMethod: $Enums.PaymentMethod | null
      paidAt: Date | null
      recordedById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recordedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receipt<T extends Payment$receiptArgs<ExtArgs> = {}>(args?: Subset<T, Payment$receiptArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly memberId: FieldRef<"Payment", 'String'>
    readonly month: FieldRef<"Payment", 'Int'>
    readonly year: FieldRef<"Payment", 'Int'>
    readonly baseAmountPaise: FieldRef<"Payment", 'Int'>
    readonly penaltyAmountPaise: FieldRef<"Payment", 'Int'>
    readonly totalAmountPaise: FieldRef<"Payment", 'Int'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly paymentMethod: FieldRef<"Payment", 'PaymentMethod'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
    readonly recordedById: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.receipt
   */
  export type Payment$receiptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    where?: ReceiptWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Receipt
   */

  export type AggregateReceipt = {
    _count: ReceiptCountAggregateOutputType | null
    _min: ReceiptMinAggregateOutputType | null
    _max: ReceiptMaxAggregateOutputType | null
  }

  export type ReceiptMinAggregateOutputType = {
    id: string | null
    paymentId: string | null
    receiptNumber: string | null
    pdfUrl: string | null
    createdAt: Date | null
  }

  export type ReceiptMaxAggregateOutputType = {
    id: string | null
    paymentId: string | null
    receiptNumber: string | null
    pdfUrl: string | null
    createdAt: Date | null
  }

  export type ReceiptCountAggregateOutputType = {
    id: number
    paymentId: number
    receiptNumber: number
    pdfUrl: number
    createdAt: number
    _all: number
  }


  export type ReceiptMinAggregateInputType = {
    id?: true
    paymentId?: true
    receiptNumber?: true
    pdfUrl?: true
    createdAt?: true
  }

  export type ReceiptMaxAggregateInputType = {
    id?: true
    paymentId?: true
    receiptNumber?: true
    pdfUrl?: true
    createdAt?: true
  }

  export type ReceiptCountAggregateInputType = {
    id?: true
    paymentId?: true
    receiptNumber?: true
    pdfUrl?: true
    createdAt?: true
    _all?: true
  }

  export type ReceiptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Receipt to aggregate.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Receipts
    **/
    _count?: true | ReceiptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReceiptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReceiptMaxAggregateInputType
  }

  export type GetReceiptAggregateType<T extends ReceiptAggregateArgs> = {
        [P in keyof T & keyof AggregateReceipt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReceipt[P]>
      : GetScalarType<T[P], AggregateReceipt[P]>
  }




  export type ReceiptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptWhereInput
    orderBy?: ReceiptOrderByWithAggregationInput | ReceiptOrderByWithAggregationInput[]
    by: ReceiptScalarFieldEnum[] | ReceiptScalarFieldEnum
    having?: ReceiptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReceiptCountAggregateInputType | true
    _min?: ReceiptMinAggregateInputType
    _max?: ReceiptMaxAggregateInputType
  }

  export type ReceiptGroupByOutputType = {
    id: string
    paymentId: string
    receiptNumber: string
    pdfUrl: string | null
    createdAt: Date
    _count: ReceiptCountAggregateOutputType | null
    _min: ReceiptMinAggregateOutputType | null
    _max: ReceiptMaxAggregateOutputType | null
  }

  type GetReceiptGroupByPayload<T extends ReceiptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReceiptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReceiptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReceiptGroupByOutputType[P]>
            : GetScalarType<T[P], ReceiptGroupByOutputType[P]>
        }
      >
    >


  export type ReceiptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    receiptNumber?: boolean
    pdfUrl?: boolean
    createdAt?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    receiptNumber?: boolean
    pdfUrl?: boolean
    createdAt?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    paymentId?: boolean
    receiptNumber?: boolean
    pdfUrl?: boolean
    createdAt?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectScalar = {
    id?: boolean
    paymentId?: boolean
    receiptNumber?: boolean
    pdfUrl?: boolean
    createdAt?: boolean
  }

  export type ReceiptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "paymentId" | "receiptNumber" | "pdfUrl" | "createdAt", ExtArgs["result"]["receipt"]>
  export type ReceiptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }
  export type ReceiptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }
  export type ReceiptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }

  export type $ReceiptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Receipt"
    objects: {
      payment: Prisma.$PaymentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      paymentId: string
      receiptNumber: string
      pdfUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["receipt"]>
    composites: {}
  }

  type ReceiptGetPayload<S extends boolean | null | undefined | ReceiptDefaultArgs> = $Result.GetResult<Prisma.$ReceiptPayload, S>

  type ReceiptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReceiptCountAggregateInputType | true
    }

  export interface ReceiptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Receipt'], meta: { name: 'Receipt' } }
    /**
     * Find zero or one Receipt that matches the filter.
     * @param {ReceiptFindUniqueArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReceiptFindUniqueArgs>(args: SelectSubset<T, ReceiptFindUniqueArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Receipt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReceiptFindUniqueOrThrowArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReceiptFindUniqueOrThrowArgs>(args: SelectSubset<T, ReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Receipt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindFirstArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReceiptFindFirstArgs>(args?: SelectSubset<T, ReceiptFindFirstArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Receipt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindFirstOrThrowArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReceiptFindFirstOrThrowArgs>(args?: SelectSubset<T, ReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Receipts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Receipts
     * const receipts = await prisma.receipt.findMany()
     * 
     * // Get first 10 Receipts
     * const receipts = await prisma.receipt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const receiptWithIdOnly = await prisma.receipt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReceiptFindManyArgs>(args?: SelectSubset<T, ReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Receipt.
     * @param {ReceiptCreateArgs} args - Arguments to create a Receipt.
     * @example
     * // Create one Receipt
     * const Receipt = await prisma.receipt.create({
     *   data: {
     *     // ... data to create a Receipt
     *   }
     * })
     * 
     */
    create<T extends ReceiptCreateArgs>(args: SelectSubset<T, ReceiptCreateArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Receipts.
     * @param {ReceiptCreateManyArgs} args - Arguments to create many Receipts.
     * @example
     * // Create many Receipts
     * const receipt = await prisma.receipt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReceiptCreateManyArgs>(args?: SelectSubset<T, ReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Receipts and returns the data saved in the database.
     * @param {ReceiptCreateManyAndReturnArgs} args - Arguments to create many Receipts.
     * @example
     * // Create many Receipts
     * const receipt = await prisma.receipt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Receipts and only return the `id`
     * const receiptWithIdOnly = await prisma.receipt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReceiptCreateManyAndReturnArgs>(args?: SelectSubset<T, ReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Receipt.
     * @param {ReceiptDeleteArgs} args - Arguments to delete one Receipt.
     * @example
     * // Delete one Receipt
     * const Receipt = await prisma.receipt.delete({
     *   where: {
     *     // ... filter to delete one Receipt
     *   }
     * })
     * 
     */
    delete<T extends ReceiptDeleteArgs>(args: SelectSubset<T, ReceiptDeleteArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Receipt.
     * @param {ReceiptUpdateArgs} args - Arguments to update one Receipt.
     * @example
     * // Update one Receipt
     * const receipt = await prisma.receipt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReceiptUpdateArgs>(args: SelectSubset<T, ReceiptUpdateArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Receipts.
     * @param {ReceiptDeleteManyArgs} args - Arguments to filter Receipts to delete.
     * @example
     * // Delete a few Receipts
     * const { count } = await prisma.receipt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReceiptDeleteManyArgs>(args?: SelectSubset<T, ReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Receipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Receipts
     * const receipt = await prisma.receipt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReceiptUpdateManyArgs>(args: SelectSubset<T, ReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Receipts and returns the data updated in the database.
     * @param {ReceiptUpdateManyAndReturnArgs} args - Arguments to update many Receipts.
     * @example
     * // Update many Receipts
     * const receipt = await prisma.receipt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Receipts and only return the `id`
     * const receiptWithIdOnly = await prisma.receipt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReceiptUpdateManyAndReturnArgs>(args: SelectSubset<T, ReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Receipt.
     * @param {ReceiptUpsertArgs} args - Arguments to update or create a Receipt.
     * @example
     * // Update or create a Receipt
     * const receipt = await prisma.receipt.upsert({
     *   create: {
     *     // ... data to create a Receipt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Receipt we want to update
     *   }
     * })
     */
    upsert<T extends ReceiptUpsertArgs>(args: SelectSubset<T, ReceiptUpsertArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Receipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptCountArgs} args - Arguments to filter Receipts to count.
     * @example
     * // Count the number of Receipts
     * const count = await prisma.receipt.count({
     *   where: {
     *     // ... the filter for the Receipts we want to count
     *   }
     * })
    **/
    count<T extends ReceiptCountArgs>(
      args?: Subset<T, ReceiptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReceiptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Receipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReceiptAggregateArgs>(args: Subset<T, ReceiptAggregateArgs>): Prisma.PrismaPromise<GetReceiptAggregateType<T>>

    /**
     * Group by Receipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReceiptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReceiptGroupByArgs['orderBy'] }
        : { orderBy?: ReceiptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Receipt model
   */
  readonly fields: ReceiptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Receipt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReceiptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payment<T extends PaymentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaymentDefaultArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Receipt model
   */
  interface ReceiptFieldRefs {
    readonly id: FieldRef<"Receipt", 'String'>
    readonly paymentId: FieldRef<"Receipt", 'String'>
    readonly receiptNumber: FieldRef<"Receipt", 'String'>
    readonly pdfUrl: FieldRef<"Receipt", 'String'>
    readonly createdAt: FieldRef<"Receipt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Receipt findUnique
   */
  export type ReceiptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt findUniqueOrThrow
   */
  export type ReceiptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt findFirst
   */
  export type ReceiptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Receipts.
     */
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt findFirstOrThrow
   */
  export type ReceiptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Receipts.
     */
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt findMany
   */
  export type ReceiptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipts to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt create
   */
  export type ReceiptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The data needed to create a Receipt.
     */
    data: XOR<ReceiptCreateInput, ReceiptUncheckedCreateInput>
  }

  /**
   * Receipt createMany
   */
  export type ReceiptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Receipts.
     */
    data: ReceiptCreateManyInput | ReceiptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Receipt createManyAndReturn
   */
  export type ReceiptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * The data used to create many Receipts.
     */
    data: ReceiptCreateManyInput | ReceiptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Receipt update
   */
  export type ReceiptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The data needed to update a Receipt.
     */
    data: XOR<ReceiptUpdateInput, ReceiptUncheckedUpdateInput>
    /**
     * Choose, which Receipt to update.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt updateMany
   */
  export type ReceiptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Receipts.
     */
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyInput>
    /**
     * Filter which Receipts to update
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to update.
     */
    limit?: number
  }

  /**
   * Receipt updateManyAndReturn
   */
  export type ReceiptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * The data used to update Receipts.
     */
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyInput>
    /**
     * Filter which Receipts to update
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Receipt upsert
   */
  export type ReceiptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The filter to search for the Receipt to update in case it exists.
     */
    where: ReceiptWhereUniqueInput
    /**
     * In case the Receipt found by the `where` argument doesn't exist, create a new Receipt with this data.
     */
    create: XOR<ReceiptCreateInput, ReceiptUncheckedCreateInput>
    /**
     * In case the Receipt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReceiptUpdateInput, ReceiptUncheckedUpdateInput>
  }

  /**
   * Receipt delete
   */
  export type ReceiptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter which Receipt to delete.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt deleteMany
   */
  export type ReceiptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Receipts to delete
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to delete.
     */
    limit?: number
  }

  /**
   * Receipt without action
   */
  export type ReceiptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
  }


  /**
   * Model Charity
   */

  export type AggregateCharity = {
    _count: CharityCountAggregateOutputType | null
    _avg: CharityAvgAggregateOutputType | null
    _sum: CharitySumAggregateOutputType | null
    _min: CharityMinAggregateOutputType | null
    _max: CharityMaxAggregateOutputType | null
  }

  export type CharityAvgAggregateOutputType = {
    amountPaise: number | null
  }

  export type CharitySumAggregateOutputType = {
    amountPaise: number | null
  }

  export type CharityMinAggregateOutputType = {
    id: string | null
    title: string | null
    beneficiary: string | null
    purpose: string | null
    amountPaise: number | null
    date: Date | null
    notes: string | null
    imageUrl: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CharityMaxAggregateOutputType = {
    id: string | null
    title: string | null
    beneficiary: string | null
    purpose: string | null
    amountPaise: number | null
    date: Date | null
    notes: string | null
    imageUrl: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CharityCountAggregateOutputType = {
    id: number
    title: number
    beneficiary: number
    purpose: number
    amountPaise: number
    date: number
    notes: number
    imageUrl: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CharityAvgAggregateInputType = {
    amountPaise?: true
  }

  export type CharitySumAggregateInputType = {
    amountPaise?: true
  }

  export type CharityMinAggregateInputType = {
    id?: true
    title?: true
    beneficiary?: true
    purpose?: true
    amountPaise?: true
    date?: true
    notes?: true
    imageUrl?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CharityMaxAggregateInputType = {
    id?: true
    title?: true
    beneficiary?: true
    purpose?: true
    amountPaise?: true
    date?: true
    notes?: true
    imageUrl?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CharityCountAggregateInputType = {
    id?: true
    title?: true
    beneficiary?: true
    purpose?: true
    amountPaise?: true
    date?: true
    notes?: true
    imageUrl?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CharityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Charity to aggregate.
     */
    where?: CharityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charities to fetch.
     */
    orderBy?: CharityOrderByWithRelationInput | CharityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CharityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Charities
    **/
    _count?: true | CharityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CharityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CharitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CharityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CharityMaxAggregateInputType
  }

  export type GetCharityAggregateType<T extends CharityAggregateArgs> = {
        [P in keyof T & keyof AggregateCharity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharity[P]>
      : GetScalarType<T[P], AggregateCharity[P]>
  }




  export type CharityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CharityWhereInput
    orderBy?: CharityOrderByWithAggregationInput | CharityOrderByWithAggregationInput[]
    by: CharityScalarFieldEnum[] | CharityScalarFieldEnum
    having?: CharityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CharityCountAggregateInputType | true
    _avg?: CharityAvgAggregateInputType
    _sum?: CharitySumAggregateInputType
    _min?: CharityMinAggregateInputType
    _max?: CharityMaxAggregateInputType
  }

  export type CharityGroupByOutputType = {
    id: string
    title: string
    beneficiary: string
    purpose: string | null
    amountPaise: number
    date: Date
    notes: string | null
    imageUrl: string | null
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: CharityCountAggregateOutputType | null
    _avg: CharityAvgAggregateOutputType | null
    _sum: CharitySumAggregateOutputType | null
    _min: CharityMinAggregateOutputType | null
    _max: CharityMaxAggregateOutputType | null
  }

  type GetCharityGroupByPayload<T extends CharityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CharityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CharityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CharityGroupByOutputType[P]>
            : GetScalarType<T[P], CharityGroupByOutputType[P]>
        }
      >
    >


  export type CharitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    beneficiary?: boolean
    purpose?: boolean
    amountPaise?: boolean
    date?: boolean
    notes?: boolean
    imageUrl?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["charity"]>

  export type CharitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    beneficiary?: boolean
    purpose?: boolean
    amountPaise?: boolean
    date?: boolean
    notes?: boolean
    imageUrl?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["charity"]>

  export type CharitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    beneficiary?: boolean
    purpose?: boolean
    amountPaise?: boolean
    date?: boolean
    notes?: boolean
    imageUrl?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["charity"]>

  export type CharitySelectScalar = {
    id?: boolean
    title?: boolean
    beneficiary?: boolean
    purpose?: boolean
    amountPaise?: boolean
    date?: boolean
    notes?: boolean
    imageUrl?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CharityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "beneficiary" | "purpose" | "amountPaise" | "date" | "notes" | "imageUrl" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["charity"]>
  export type CharityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CharityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CharityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CharityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Charity"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      beneficiary: string
      purpose: string | null
      amountPaise: number
      date: Date
      notes: string | null
      imageUrl: string | null
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["charity"]>
    composites: {}
  }

  type CharityGetPayload<S extends boolean | null | undefined | CharityDefaultArgs> = $Result.GetResult<Prisma.$CharityPayload, S>

  type CharityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CharityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CharityCountAggregateInputType | true
    }

  export interface CharityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Charity'], meta: { name: 'Charity' } }
    /**
     * Find zero or one Charity that matches the filter.
     * @param {CharityFindUniqueArgs} args - Arguments to find a Charity
     * @example
     * // Get one Charity
     * const charity = await prisma.charity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CharityFindUniqueArgs>(args: SelectSubset<T, CharityFindUniqueArgs<ExtArgs>>): Prisma__CharityClient<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Charity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CharityFindUniqueOrThrowArgs} args - Arguments to find a Charity
     * @example
     * // Get one Charity
     * const charity = await prisma.charity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CharityFindUniqueOrThrowArgs>(args: SelectSubset<T, CharityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CharityClient<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Charity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityFindFirstArgs} args - Arguments to find a Charity
     * @example
     * // Get one Charity
     * const charity = await prisma.charity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CharityFindFirstArgs>(args?: SelectSubset<T, CharityFindFirstArgs<ExtArgs>>): Prisma__CharityClient<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Charity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityFindFirstOrThrowArgs} args - Arguments to find a Charity
     * @example
     * // Get one Charity
     * const charity = await prisma.charity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CharityFindFirstOrThrowArgs>(args?: SelectSubset<T, CharityFindFirstOrThrowArgs<ExtArgs>>): Prisma__CharityClient<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Charities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Charities
     * const charities = await prisma.charity.findMany()
     * 
     * // Get first 10 Charities
     * const charities = await prisma.charity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const charityWithIdOnly = await prisma.charity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CharityFindManyArgs>(args?: SelectSubset<T, CharityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Charity.
     * @param {CharityCreateArgs} args - Arguments to create a Charity.
     * @example
     * // Create one Charity
     * const Charity = await prisma.charity.create({
     *   data: {
     *     // ... data to create a Charity
     *   }
     * })
     * 
     */
    create<T extends CharityCreateArgs>(args: SelectSubset<T, CharityCreateArgs<ExtArgs>>): Prisma__CharityClient<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Charities.
     * @param {CharityCreateManyArgs} args - Arguments to create many Charities.
     * @example
     * // Create many Charities
     * const charity = await prisma.charity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CharityCreateManyArgs>(args?: SelectSubset<T, CharityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Charities and returns the data saved in the database.
     * @param {CharityCreateManyAndReturnArgs} args - Arguments to create many Charities.
     * @example
     * // Create many Charities
     * const charity = await prisma.charity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Charities and only return the `id`
     * const charityWithIdOnly = await prisma.charity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CharityCreateManyAndReturnArgs>(args?: SelectSubset<T, CharityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Charity.
     * @param {CharityDeleteArgs} args - Arguments to delete one Charity.
     * @example
     * // Delete one Charity
     * const Charity = await prisma.charity.delete({
     *   where: {
     *     // ... filter to delete one Charity
     *   }
     * })
     * 
     */
    delete<T extends CharityDeleteArgs>(args: SelectSubset<T, CharityDeleteArgs<ExtArgs>>): Prisma__CharityClient<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Charity.
     * @param {CharityUpdateArgs} args - Arguments to update one Charity.
     * @example
     * // Update one Charity
     * const charity = await prisma.charity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CharityUpdateArgs>(args: SelectSubset<T, CharityUpdateArgs<ExtArgs>>): Prisma__CharityClient<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Charities.
     * @param {CharityDeleteManyArgs} args - Arguments to filter Charities to delete.
     * @example
     * // Delete a few Charities
     * const { count } = await prisma.charity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CharityDeleteManyArgs>(args?: SelectSubset<T, CharityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Charities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Charities
     * const charity = await prisma.charity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CharityUpdateManyArgs>(args: SelectSubset<T, CharityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Charities and returns the data updated in the database.
     * @param {CharityUpdateManyAndReturnArgs} args - Arguments to update many Charities.
     * @example
     * // Update many Charities
     * const charity = await prisma.charity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Charities and only return the `id`
     * const charityWithIdOnly = await prisma.charity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CharityUpdateManyAndReturnArgs>(args: SelectSubset<T, CharityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Charity.
     * @param {CharityUpsertArgs} args - Arguments to update or create a Charity.
     * @example
     * // Update or create a Charity
     * const charity = await prisma.charity.upsert({
     *   create: {
     *     // ... data to create a Charity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Charity we want to update
     *   }
     * })
     */
    upsert<T extends CharityUpsertArgs>(args: SelectSubset<T, CharityUpsertArgs<ExtArgs>>): Prisma__CharityClient<$Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Charities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityCountArgs} args - Arguments to filter Charities to count.
     * @example
     * // Count the number of Charities
     * const count = await prisma.charity.count({
     *   where: {
     *     // ... the filter for the Charities we want to count
     *   }
     * })
    **/
    count<T extends CharityCountArgs>(
      args?: Subset<T, CharityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CharityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Charity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CharityAggregateArgs>(args: Subset<T, CharityAggregateArgs>): Prisma.PrismaPromise<GetCharityAggregateType<T>>

    /**
     * Group by Charity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CharityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CharityGroupByArgs['orderBy'] }
        : { orderBy?: CharityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CharityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Charity model
   */
  readonly fields: CharityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Charity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CharityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Charity model
   */
  interface CharityFieldRefs {
    readonly id: FieldRef<"Charity", 'String'>
    readonly title: FieldRef<"Charity", 'String'>
    readonly beneficiary: FieldRef<"Charity", 'String'>
    readonly purpose: FieldRef<"Charity", 'String'>
    readonly amountPaise: FieldRef<"Charity", 'Int'>
    readonly date: FieldRef<"Charity", 'DateTime'>
    readonly notes: FieldRef<"Charity", 'String'>
    readonly imageUrl: FieldRef<"Charity", 'String'>
    readonly createdById: FieldRef<"Charity", 'String'>
    readonly createdAt: FieldRef<"Charity", 'DateTime'>
    readonly updatedAt: FieldRef<"Charity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Charity findUnique
   */
  export type CharityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
    /**
     * Filter, which Charity to fetch.
     */
    where: CharityWhereUniqueInput
  }

  /**
   * Charity findUniqueOrThrow
   */
  export type CharityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
    /**
     * Filter, which Charity to fetch.
     */
    where: CharityWhereUniqueInput
  }

  /**
   * Charity findFirst
   */
  export type CharityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
    /**
     * Filter, which Charity to fetch.
     */
    where?: CharityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charities to fetch.
     */
    orderBy?: CharityOrderByWithRelationInput | CharityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Charities.
     */
    cursor?: CharityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Charities.
     */
    distinct?: CharityScalarFieldEnum | CharityScalarFieldEnum[]
  }

  /**
   * Charity findFirstOrThrow
   */
  export type CharityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
    /**
     * Filter, which Charity to fetch.
     */
    where?: CharityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charities to fetch.
     */
    orderBy?: CharityOrderByWithRelationInput | CharityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Charities.
     */
    cursor?: CharityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Charities.
     */
    distinct?: CharityScalarFieldEnum | CharityScalarFieldEnum[]
  }

  /**
   * Charity findMany
   */
  export type CharityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
    /**
     * Filter, which Charities to fetch.
     */
    where?: CharityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charities to fetch.
     */
    orderBy?: CharityOrderByWithRelationInput | CharityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Charities.
     */
    cursor?: CharityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charities.
     */
    skip?: number
    distinct?: CharityScalarFieldEnum | CharityScalarFieldEnum[]
  }

  /**
   * Charity create
   */
  export type CharityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
    /**
     * The data needed to create a Charity.
     */
    data: XOR<CharityCreateInput, CharityUncheckedCreateInput>
  }

  /**
   * Charity createMany
   */
  export type CharityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Charities.
     */
    data: CharityCreateManyInput | CharityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Charity createManyAndReturn
   */
  export type CharityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * The data used to create many Charities.
     */
    data: CharityCreateManyInput | CharityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Charity update
   */
  export type CharityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
    /**
     * The data needed to update a Charity.
     */
    data: XOR<CharityUpdateInput, CharityUncheckedUpdateInput>
    /**
     * Choose, which Charity to update.
     */
    where: CharityWhereUniqueInput
  }

  /**
   * Charity updateMany
   */
  export type CharityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Charities.
     */
    data: XOR<CharityUpdateManyMutationInput, CharityUncheckedUpdateManyInput>
    /**
     * Filter which Charities to update
     */
    where?: CharityWhereInput
    /**
     * Limit how many Charities to update.
     */
    limit?: number
  }

  /**
   * Charity updateManyAndReturn
   */
  export type CharityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * The data used to update Charities.
     */
    data: XOR<CharityUpdateManyMutationInput, CharityUncheckedUpdateManyInput>
    /**
     * Filter which Charities to update
     */
    where?: CharityWhereInput
    /**
     * Limit how many Charities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Charity upsert
   */
  export type CharityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
    /**
     * The filter to search for the Charity to update in case it exists.
     */
    where: CharityWhereUniqueInput
    /**
     * In case the Charity found by the `where` argument doesn't exist, create a new Charity with this data.
     */
    create: XOR<CharityCreateInput, CharityUncheckedCreateInput>
    /**
     * In case the Charity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CharityUpdateInput, CharityUncheckedUpdateInput>
  }

  /**
   * Charity delete
   */
  export type CharityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
    /**
     * Filter which Charity to delete.
     */
    where: CharityWhereUniqueInput
  }

  /**
   * Charity deleteMany
   */
  export type CharityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Charities to delete
     */
    where?: CharityWhereInput
    /**
     * Limit how many Charities to delete.
     */
    limit?: number
  }

  /**
   * Charity without action
   */
  export type CharityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: CharitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Charity
     */
    omit?: CharityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CharityInclude<ExtArgs> | null
  }


  /**
   * Model Loan
   */

  export type AggregateLoan = {
    _count: LoanCountAggregateOutputType | null
    _avg: LoanAvgAggregateOutputType | null
    _sum: LoanSumAggregateOutputType | null
    _min: LoanMinAggregateOutputType | null
    _max: LoanMaxAggregateOutputType | null
  }

  export type LoanAvgAggregateOutputType = {
    principalPaise: number | null
    monthlyRateBps: number | null
    durationMonths: number | null
  }

  export type LoanSumAggregateOutputType = {
    principalPaise: number | null
    monthlyRateBps: number | null
    durationMonths: number | null
  }

  export type LoanMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    principalPaise: number | null
    monthlyRateBps: number | null
    durationMonths: number | null
    startDate: Date | null
    status: $Enums.LoanStatus | null
    createdById: string | null
    approvedById: string | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoanMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    principalPaise: number | null
    monthlyRateBps: number | null
    durationMonths: number | null
    startDate: Date | null
    status: $Enums.LoanStatus | null
    createdById: string | null
    approvedById: string | null
    approvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoanCountAggregateOutputType = {
    id: number
    memberId: number
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: number
    status: number
    termsJson: number
    createdById: number
    approvedById: number
    approvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoanAvgAggregateInputType = {
    principalPaise?: true
    monthlyRateBps?: true
    durationMonths?: true
  }

  export type LoanSumAggregateInputType = {
    principalPaise?: true
    monthlyRateBps?: true
    durationMonths?: true
  }

  export type LoanMinAggregateInputType = {
    id?: true
    memberId?: true
    principalPaise?: true
    monthlyRateBps?: true
    durationMonths?: true
    startDate?: true
    status?: true
    createdById?: true
    approvedById?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoanMaxAggregateInputType = {
    id?: true
    memberId?: true
    principalPaise?: true
    monthlyRateBps?: true
    durationMonths?: true
    startDate?: true
    status?: true
    createdById?: true
    approvedById?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoanCountAggregateInputType = {
    id?: true
    memberId?: true
    principalPaise?: true
    monthlyRateBps?: true
    durationMonths?: true
    startDate?: true
    status?: true
    termsJson?: true
    createdById?: true
    approvedById?: true
    approvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Loan to aggregate.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Loans
    **/
    _count?: true | LoanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanMaxAggregateInputType
  }

  export type GetLoanAggregateType<T extends LoanAggregateArgs> = {
        [P in keyof T & keyof AggregateLoan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoan[P]>
      : GetScalarType<T[P], AggregateLoan[P]>
  }




  export type LoanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithAggregationInput | LoanOrderByWithAggregationInput[]
    by: LoanScalarFieldEnum[] | LoanScalarFieldEnum
    having?: LoanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanCountAggregateInputType | true
    _avg?: LoanAvgAggregateInputType
    _sum?: LoanSumAggregateInputType
    _min?: LoanMinAggregateInputType
    _max?: LoanMaxAggregateInputType
  }

  export type LoanGroupByOutputType = {
    id: string
    memberId: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date
    status: $Enums.LoanStatus
    termsJson: JsonValue | null
    createdById: string
    approvedById: string | null
    approvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: LoanCountAggregateOutputType | null
    _avg: LoanAvgAggregateOutputType | null
    _sum: LoanSumAggregateOutputType | null
    _min: LoanMinAggregateOutputType | null
    _max: LoanMaxAggregateOutputType | null
  }

  type GetLoanGroupByPayload<T extends LoanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanGroupByOutputType[P]>
            : GetScalarType<T[P], LoanGroupByOutputType[P]>
        }
      >
    >


  export type LoanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    principalPaise?: boolean
    monthlyRateBps?: boolean
    durationMonths?: boolean
    startDate?: boolean
    status?: boolean
    termsJson?: boolean
    createdById?: boolean
    approvedById?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
    installments?: boolean | Loan$installmentsArgs<ExtArgs>
    _count?: boolean | LoanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    principalPaise?: boolean
    monthlyRateBps?: boolean
    durationMonths?: boolean
    startDate?: boolean
    status?: boolean
    termsJson?: boolean
    createdById?: boolean
    approvedById?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    principalPaise?: boolean
    monthlyRateBps?: boolean
    durationMonths?: boolean
    startDate?: boolean
    status?: boolean
    termsJson?: boolean
    createdById?: boolean
    approvedById?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectScalar = {
    id?: boolean
    memberId?: boolean
    principalPaise?: boolean
    monthlyRateBps?: boolean
    durationMonths?: boolean
    startDate?: boolean
    status?: boolean
    termsJson?: boolean
    createdById?: boolean
    approvedById?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberId" | "principalPaise" | "monthlyRateBps" | "durationMonths" | "startDate" | "status" | "termsJson" | "createdById" | "approvedById" | "approvedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["loan"]>
  export type LoanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
    installments?: boolean | Loan$installmentsArgs<ExtArgs>
    _count?: boolean | LoanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
  }
  export type LoanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    approvedBy?: boolean | Loan$approvedByArgs<ExtArgs>
  }

  export type $LoanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Loan"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
      approvedBy: Prisma.$UserPayload<ExtArgs> | null
      installments: Prisma.$LoanInstallmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      principalPaise: number
      monthlyRateBps: number
      durationMonths: number
      startDate: Date
      status: $Enums.LoanStatus
      termsJson: Prisma.JsonValue | null
      createdById: string
      approvedById: string | null
      approvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["loan"]>
    composites: {}
  }

  type LoanGetPayload<S extends boolean | null | undefined | LoanDefaultArgs> = $Result.GetResult<Prisma.$LoanPayload, S>

  type LoanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoanCountAggregateInputType | true
    }

  export interface LoanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Loan'], meta: { name: 'Loan' } }
    /**
     * Find zero or one Loan that matches the filter.
     * @param {LoanFindUniqueArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanFindUniqueArgs>(args: SelectSubset<T, LoanFindUniqueArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Loan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanFindUniqueOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Loan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanFindFirstArgs>(args?: SelectSubset<T, LoanFindFirstArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Loan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Loans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Loans
     * const loans = await prisma.loan.findMany()
     * 
     * // Get first 10 Loans
     * const loans = await prisma.loan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanWithIdOnly = await prisma.loan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanFindManyArgs>(args?: SelectSubset<T, LoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Loan.
     * @param {LoanCreateArgs} args - Arguments to create a Loan.
     * @example
     * // Create one Loan
     * const Loan = await prisma.loan.create({
     *   data: {
     *     // ... data to create a Loan
     *   }
     * })
     * 
     */
    create<T extends LoanCreateArgs>(args: SelectSubset<T, LoanCreateArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Loans.
     * @param {LoanCreateManyArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanCreateManyArgs>(args?: SelectSubset<T, LoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Loans and returns the data saved in the database.
     * @param {LoanCreateManyAndReturnArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoanCreateManyAndReturnArgs>(args?: SelectSubset<T, LoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Loan.
     * @param {LoanDeleteArgs} args - Arguments to delete one Loan.
     * @example
     * // Delete one Loan
     * const Loan = await prisma.loan.delete({
     *   where: {
     *     // ... filter to delete one Loan
     *   }
     * })
     * 
     */
    delete<T extends LoanDeleteArgs>(args: SelectSubset<T, LoanDeleteArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Loan.
     * @param {LoanUpdateArgs} args - Arguments to update one Loan.
     * @example
     * // Update one Loan
     * const loan = await prisma.loan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanUpdateArgs>(args: SelectSubset<T, LoanUpdateArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Loans.
     * @param {LoanDeleteManyArgs} args - Arguments to filter Loans to delete.
     * @example
     * // Delete a few Loans
     * const { count } = await prisma.loan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanDeleteManyArgs>(args?: SelectSubset<T, LoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanUpdateManyArgs>(args: SelectSubset<T, LoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loans and returns the data updated in the database.
     * @param {LoanUpdateManyAndReturnArgs} args - Arguments to update many Loans.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoanUpdateManyAndReturnArgs>(args: SelectSubset<T, LoanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Loan.
     * @param {LoanUpsertArgs} args - Arguments to update or create a Loan.
     * @example
     * // Update or create a Loan
     * const loan = await prisma.loan.upsert({
     *   create: {
     *     // ... data to create a Loan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Loan we want to update
     *   }
     * })
     */
    upsert<T extends LoanUpsertArgs>(args: SelectSubset<T, LoanUpsertArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanCountArgs} args - Arguments to filter Loans to count.
     * @example
     * // Count the number of Loans
     * const count = await prisma.loan.count({
     *   where: {
     *     // ... the filter for the Loans we want to count
     *   }
     * })
    **/
    count<T extends LoanCountArgs>(
      args?: Subset<T, LoanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanAggregateArgs>(args: Subset<T, LoanAggregateArgs>): Prisma.PrismaPromise<GetLoanAggregateType<T>>

    /**
     * Group by Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanGroupByArgs['orderBy'] }
        : { orderBy?: LoanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Loan model
   */
  readonly fields: LoanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Loan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approvedBy<T extends Loan$approvedByArgs<ExtArgs> = {}>(args?: Subset<T, Loan$approvedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    installments<T extends Loan$installmentsArgs<ExtArgs> = {}>(args?: Subset<T, Loan$installmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Loan model
   */
  interface LoanFieldRefs {
    readonly id: FieldRef<"Loan", 'String'>
    readonly memberId: FieldRef<"Loan", 'String'>
    readonly principalPaise: FieldRef<"Loan", 'Int'>
    readonly monthlyRateBps: FieldRef<"Loan", 'Int'>
    readonly durationMonths: FieldRef<"Loan", 'Int'>
    readonly startDate: FieldRef<"Loan", 'DateTime'>
    readonly status: FieldRef<"Loan", 'LoanStatus'>
    readonly termsJson: FieldRef<"Loan", 'Json'>
    readonly createdById: FieldRef<"Loan", 'String'>
    readonly approvedById: FieldRef<"Loan", 'String'>
    readonly approvedAt: FieldRef<"Loan", 'DateTime'>
    readonly createdAt: FieldRef<"Loan", 'DateTime'>
    readonly updatedAt: FieldRef<"Loan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Loan findUnique
   */
  export type LoanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan findUniqueOrThrow
   */
  export type LoanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan findFirst
   */
  export type LoanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan findFirstOrThrow
   */
  export type LoanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan findMany
   */
  export type LoanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loans to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan create
   */
  export type LoanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The data needed to create a Loan.
     */
    data: XOR<LoanCreateInput, LoanUncheckedCreateInput>
  }

  /**
   * Loan createMany
   */
  export type LoanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Loans.
     */
    data: LoanCreateManyInput | LoanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Loan createManyAndReturn
   */
  export type LoanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * The data used to create many Loans.
     */
    data: LoanCreateManyInput | LoanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Loan update
   */
  export type LoanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The data needed to update a Loan.
     */
    data: XOR<LoanUpdateInput, LoanUncheckedUpdateInput>
    /**
     * Choose, which Loan to update.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan updateMany
   */
  export type LoanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Loans.
     */
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyInput>
    /**
     * Filter which Loans to update
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to update.
     */
    limit?: number
  }

  /**
   * Loan updateManyAndReturn
   */
  export type LoanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * The data used to update Loans.
     */
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyInput>
    /**
     * Filter which Loans to update
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Loan upsert
   */
  export type LoanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The filter to search for the Loan to update in case it exists.
     */
    where: LoanWhereUniqueInput
    /**
     * In case the Loan found by the `where` argument doesn't exist, create a new Loan with this data.
     */
    create: XOR<LoanCreateInput, LoanUncheckedCreateInput>
    /**
     * In case the Loan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanUpdateInput, LoanUncheckedUpdateInput>
  }

  /**
   * Loan delete
   */
  export type LoanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter which Loan to delete.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan deleteMany
   */
  export type LoanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Loans to delete
     */
    where?: LoanWhereInput
    /**
     * Limit how many Loans to delete.
     */
    limit?: number
  }

  /**
   * Loan.approvedBy
   */
  export type Loan$approvedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Loan.installments
   */
  export type Loan$installmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    where?: LoanInstallmentWhereInput
    orderBy?: LoanInstallmentOrderByWithRelationInput | LoanInstallmentOrderByWithRelationInput[]
    cursor?: LoanInstallmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanInstallmentScalarFieldEnum | LoanInstallmentScalarFieldEnum[]
  }

  /**
   * Loan without action
   */
  export type LoanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Loan
     */
    omit?: LoanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
  }


  /**
   * Model LoanInstallment
   */

  export type AggregateLoanInstallment = {
    _count: LoanInstallmentCountAggregateOutputType | null
    _avg: LoanInstallmentAvgAggregateOutputType | null
    _sum: LoanInstallmentSumAggregateOutputType | null
    _min: LoanInstallmentMinAggregateOutputType | null
    _max: LoanInstallmentMaxAggregateOutputType | null
  }

  export type LoanInstallmentAvgAggregateOutputType = {
    installmentNumber: number | null
    interestDuePaise: number | null
    principalDuePaise: number | null
    amountPaidPaise: number | null
    overdueInterestPaise: number | null
  }

  export type LoanInstallmentSumAggregateOutputType = {
    installmentNumber: number | null
    interestDuePaise: number | null
    principalDuePaise: number | null
    amountPaidPaise: number | null
    overdueInterestPaise: number | null
  }

  export type LoanInstallmentMinAggregateOutputType = {
    id: string | null
    loanId: string | null
    installmentNumber: number | null
    dueDate: Date | null
    interestDuePaise: number | null
    principalDuePaise: number | null
    amountPaidPaise: number | null
    paidAt: Date | null
    overdueInterestPaise: number | null
    recordedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoanInstallmentMaxAggregateOutputType = {
    id: string | null
    loanId: string | null
    installmentNumber: number | null
    dueDate: Date | null
    interestDuePaise: number | null
    principalDuePaise: number | null
    amountPaidPaise: number | null
    paidAt: Date | null
    overdueInterestPaise: number | null
    recordedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LoanInstallmentCountAggregateOutputType = {
    id: number
    loanId: number
    installmentNumber: number
    dueDate: number
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise: number
    paidAt: number
    overdueInterestPaise: number
    recordedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LoanInstallmentAvgAggregateInputType = {
    installmentNumber?: true
    interestDuePaise?: true
    principalDuePaise?: true
    amountPaidPaise?: true
    overdueInterestPaise?: true
  }

  export type LoanInstallmentSumAggregateInputType = {
    installmentNumber?: true
    interestDuePaise?: true
    principalDuePaise?: true
    amountPaidPaise?: true
    overdueInterestPaise?: true
  }

  export type LoanInstallmentMinAggregateInputType = {
    id?: true
    loanId?: true
    installmentNumber?: true
    dueDate?: true
    interestDuePaise?: true
    principalDuePaise?: true
    amountPaidPaise?: true
    paidAt?: true
    overdueInterestPaise?: true
    recordedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoanInstallmentMaxAggregateInputType = {
    id?: true
    loanId?: true
    installmentNumber?: true
    dueDate?: true
    interestDuePaise?: true
    principalDuePaise?: true
    amountPaidPaise?: true
    paidAt?: true
    overdueInterestPaise?: true
    recordedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LoanInstallmentCountAggregateInputType = {
    id?: true
    loanId?: true
    installmentNumber?: true
    dueDate?: true
    interestDuePaise?: true
    principalDuePaise?: true
    amountPaidPaise?: true
    paidAt?: true
    overdueInterestPaise?: true
    recordedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LoanInstallmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanInstallment to aggregate.
     */
    where?: LoanInstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanInstallments to fetch.
     */
    orderBy?: LoanInstallmentOrderByWithRelationInput | LoanInstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanInstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanInstallments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanInstallments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LoanInstallments
    **/
    _count?: true | LoanInstallmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoanInstallmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoanInstallmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanInstallmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanInstallmentMaxAggregateInputType
  }

  export type GetLoanInstallmentAggregateType<T extends LoanInstallmentAggregateArgs> = {
        [P in keyof T & keyof AggregateLoanInstallment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoanInstallment[P]>
      : GetScalarType<T[P], AggregateLoanInstallment[P]>
  }




  export type LoanInstallmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanInstallmentWhereInput
    orderBy?: LoanInstallmentOrderByWithAggregationInput | LoanInstallmentOrderByWithAggregationInput[]
    by: LoanInstallmentScalarFieldEnum[] | LoanInstallmentScalarFieldEnum
    having?: LoanInstallmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanInstallmentCountAggregateInputType | true
    _avg?: LoanInstallmentAvgAggregateInputType
    _sum?: LoanInstallmentSumAggregateInputType
    _min?: LoanInstallmentMinAggregateInputType
    _max?: LoanInstallmentMaxAggregateInputType
  }

  export type LoanInstallmentGroupByOutputType = {
    id: string
    loanId: string
    installmentNumber: number
    dueDate: Date
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise: number
    paidAt: Date | null
    overdueInterestPaise: number
    recordedById: string | null
    createdAt: Date
    updatedAt: Date
    _count: LoanInstallmentCountAggregateOutputType | null
    _avg: LoanInstallmentAvgAggregateOutputType | null
    _sum: LoanInstallmentSumAggregateOutputType | null
    _min: LoanInstallmentMinAggregateOutputType | null
    _max: LoanInstallmentMaxAggregateOutputType | null
  }

  type GetLoanInstallmentGroupByPayload<T extends LoanInstallmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanInstallmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanInstallmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanInstallmentGroupByOutputType[P]>
            : GetScalarType<T[P], LoanInstallmentGroupByOutputType[P]>
        }
      >
    >


  export type LoanInstallmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    installmentNumber?: boolean
    dueDate?: boolean
    interestDuePaise?: boolean
    principalDuePaise?: boolean
    amountPaidPaise?: boolean
    paidAt?: boolean
    overdueInterestPaise?: boolean
    recordedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    recordedBy?: boolean | LoanInstallment$recordedByArgs<ExtArgs>
  }, ExtArgs["result"]["loanInstallment"]>

  export type LoanInstallmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    installmentNumber?: boolean
    dueDate?: boolean
    interestDuePaise?: boolean
    principalDuePaise?: boolean
    amountPaidPaise?: boolean
    paidAt?: boolean
    overdueInterestPaise?: boolean
    recordedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    recordedBy?: boolean | LoanInstallment$recordedByArgs<ExtArgs>
  }, ExtArgs["result"]["loanInstallment"]>

  export type LoanInstallmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    loanId?: boolean
    installmentNumber?: boolean
    dueDate?: boolean
    interestDuePaise?: boolean
    principalDuePaise?: boolean
    amountPaidPaise?: boolean
    paidAt?: boolean
    overdueInterestPaise?: boolean
    recordedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    recordedBy?: boolean | LoanInstallment$recordedByArgs<ExtArgs>
  }, ExtArgs["result"]["loanInstallment"]>

  export type LoanInstallmentSelectScalar = {
    id?: boolean
    loanId?: boolean
    installmentNumber?: boolean
    dueDate?: boolean
    interestDuePaise?: boolean
    principalDuePaise?: boolean
    amountPaidPaise?: boolean
    paidAt?: boolean
    overdueInterestPaise?: boolean
    recordedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LoanInstallmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "loanId" | "installmentNumber" | "dueDate" | "interestDuePaise" | "principalDuePaise" | "amountPaidPaise" | "paidAt" | "overdueInterestPaise" | "recordedById" | "createdAt" | "updatedAt", ExtArgs["result"]["loanInstallment"]>
  export type LoanInstallmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    recordedBy?: boolean | LoanInstallment$recordedByArgs<ExtArgs>
  }
  export type LoanInstallmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    recordedBy?: boolean | LoanInstallment$recordedByArgs<ExtArgs>
  }
  export type LoanInstallmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    loan?: boolean | LoanDefaultArgs<ExtArgs>
    recordedBy?: boolean | LoanInstallment$recordedByArgs<ExtArgs>
  }

  export type $LoanInstallmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LoanInstallment"
    objects: {
      loan: Prisma.$LoanPayload<ExtArgs>
      recordedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      loanId: string
      installmentNumber: number
      dueDate: Date
      interestDuePaise: number
      principalDuePaise: number
      amountPaidPaise: number
      paidAt: Date | null
      overdueInterestPaise: number
      recordedById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["loanInstallment"]>
    composites: {}
  }

  type LoanInstallmentGetPayload<S extends boolean | null | undefined | LoanInstallmentDefaultArgs> = $Result.GetResult<Prisma.$LoanInstallmentPayload, S>

  type LoanInstallmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoanInstallmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoanInstallmentCountAggregateInputType | true
    }

  export interface LoanInstallmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LoanInstallment'], meta: { name: 'LoanInstallment' } }
    /**
     * Find zero or one LoanInstallment that matches the filter.
     * @param {LoanInstallmentFindUniqueArgs} args - Arguments to find a LoanInstallment
     * @example
     * // Get one LoanInstallment
     * const loanInstallment = await prisma.loanInstallment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanInstallmentFindUniqueArgs>(args: SelectSubset<T, LoanInstallmentFindUniqueArgs<ExtArgs>>): Prisma__LoanInstallmentClient<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LoanInstallment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanInstallmentFindUniqueOrThrowArgs} args - Arguments to find a LoanInstallment
     * @example
     * // Get one LoanInstallment
     * const loanInstallment = await prisma.loanInstallment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanInstallmentFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanInstallmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanInstallmentClient<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoanInstallment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanInstallmentFindFirstArgs} args - Arguments to find a LoanInstallment
     * @example
     * // Get one LoanInstallment
     * const loanInstallment = await prisma.loanInstallment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanInstallmentFindFirstArgs>(args?: SelectSubset<T, LoanInstallmentFindFirstArgs<ExtArgs>>): Prisma__LoanInstallmentClient<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LoanInstallment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanInstallmentFindFirstOrThrowArgs} args - Arguments to find a LoanInstallment
     * @example
     * // Get one LoanInstallment
     * const loanInstallment = await prisma.loanInstallment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanInstallmentFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanInstallmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanInstallmentClient<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LoanInstallments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanInstallmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LoanInstallments
     * const loanInstallments = await prisma.loanInstallment.findMany()
     * 
     * // Get first 10 LoanInstallments
     * const loanInstallments = await prisma.loanInstallment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanInstallmentWithIdOnly = await prisma.loanInstallment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanInstallmentFindManyArgs>(args?: SelectSubset<T, LoanInstallmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LoanInstallment.
     * @param {LoanInstallmentCreateArgs} args - Arguments to create a LoanInstallment.
     * @example
     * // Create one LoanInstallment
     * const LoanInstallment = await prisma.loanInstallment.create({
     *   data: {
     *     // ... data to create a LoanInstallment
     *   }
     * })
     * 
     */
    create<T extends LoanInstallmentCreateArgs>(args: SelectSubset<T, LoanInstallmentCreateArgs<ExtArgs>>): Prisma__LoanInstallmentClient<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LoanInstallments.
     * @param {LoanInstallmentCreateManyArgs} args - Arguments to create many LoanInstallments.
     * @example
     * // Create many LoanInstallments
     * const loanInstallment = await prisma.loanInstallment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanInstallmentCreateManyArgs>(args?: SelectSubset<T, LoanInstallmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LoanInstallments and returns the data saved in the database.
     * @param {LoanInstallmentCreateManyAndReturnArgs} args - Arguments to create many LoanInstallments.
     * @example
     * // Create many LoanInstallments
     * const loanInstallment = await prisma.loanInstallment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LoanInstallments and only return the `id`
     * const loanInstallmentWithIdOnly = await prisma.loanInstallment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoanInstallmentCreateManyAndReturnArgs>(args?: SelectSubset<T, LoanInstallmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LoanInstallment.
     * @param {LoanInstallmentDeleteArgs} args - Arguments to delete one LoanInstallment.
     * @example
     * // Delete one LoanInstallment
     * const LoanInstallment = await prisma.loanInstallment.delete({
     *   where: {
     *     // ... filter to delete one LoanInstallment
     *   }
     * })
     * 
     */
    delete<T extends LoanInstallmentDeleteArgs>(args: SelectSubset<T, LoanInstallmentDeleteArgs<ExtArgs>>): Prisma__LoanInstallmentClient<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LoanInstallment.
     * @param {LoanInstallmentUpdateArgs} args - Arguments to update one LoanInstallment.
     * @example
     * // Update one LoanInstallment
     * const loanInstallment = await prisma.loanInstallment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanInstallmentUpdateArgs>(args: SelectSubset<T, LoanInstallmentUpdateArgs<ExtArgs>>): Prisma__LoanInstallmentClient<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LoanInstallments.
     * @param {LoanInstallmentDeleteManyArgs} args - Arguments to filter LoanInstallments to delete.
     * @example
     * // Delete a few LoanInstallments
     * const { count } = await prisma.loanInstallment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanInstallmentDeleteManyArgs>(args?: SelectSubset<T, LoanInstallmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanInstallments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanInstallmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LoanInstallments
     * const loanInstallment = await prisma.loanInstallment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanInstallmentUpdateManyArgs>(args: SelectSubset<T, LoanInstallmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LoanInstallments and returns the data updated in the database.
     * @param {LoanInstallmentUpdateManyAndReturnArgs} args - Arguments to update many LoanInstallments.
     * @example
     * // Update many LoanInstallments
     * const loanInstallment = await prisma.loanInstallment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LoanInstallments and only return the `id`
     * const loanInstallmentWithIdOnly = await prisma.loanInstallment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoanInstallmentUpdateManyAndReturnArgs>(args: SelectSubset<T, LoanInstallmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LoanInstallment.
     * @param {LoanInstallmentUpsertArgs} args - Arguments to update or create a LoanInstallment.
     * @example
     * // Update or create a LoanInstallment
     * const loanInstallment = await prisma.loanInstallment.upsert({
     *   create: {
     *     // ... data to create a LoanInstallment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LoanInstallment we want to update
     *   }
     * })
     */
    upsert<T extends LoanInstallmentUpsertArgs>(args: SelectSubset<T, LoanInstallmentUpsertArgs<ExtArgs>>): Prisma__LoanInstallmentClient<$Result.GetResult<Prisma.$LoanInstallmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LoanInstallments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanInstallmentCountArgs} args - Arguments to filter LoanInstallments to count.
     * @example
     * // Count the number of LoanInstallments
     * const count = await prisma.loanInstallment.count({
     *   where: {
     *     // ... the filter for the LoanInstallments we want to count
     *   }
     * })
    **/
    count<T extends LoanInstallmentCountArgs>(
      args?: Subset<T, LoanInstallmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanInstallmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LoanInstallment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanInstallmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanInstallmentAggregateArgs>(args: Subset<T, LoanInstallmentAggregateArgs>): Prisma.PrismaPromise<GetLoanInstallmentAggregateType<T>>

    /**
     * Group by LoanInstallment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanInstallmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoanInstallmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanInstallmentGroupByArgs['orderBy'] }
        : { orderBy?: LoanInstallmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoanInstallmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanInstallmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LoanInstallment model
   */
  readonly fields: LoanInstallmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LoanInstallment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanInstallmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    loan<T extends LoanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoanDefaultArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recordedBy<T extends LoanInstallment$recordedByArgs<ExtArgs> = {}>(args?: Subset<T, LoanInstallment$recordedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LoanInstallment model
   */
  interface LoanInstallmentFieldRefs {
    readonly id: FieldRef<"LoanInstallment", 'String'>
    readonly loanId: FieldRef<"LoanInstallment", 'String'>
    readonly installmentNumber: FieldRef<"LoanInstallment", 'Int'>
    readonly dueDate: FieldRef<"LoanInstallment", 'DateTime'>
    readonly interestDuePaise: FieldRef<"LoanInstallment", 'Int'>
    readonly principalDuePaise: FieldRef<"LoanInstallment", 'Int'>
    readonly amountPaidPaise: FieldRef<"LoanInstallment", 'Int'>
    readonly paidAt: FieldRef<"LoanInstallment", 'DateTime'>
    readonly overdueInterestPaise: FieldRef<"LoanInstallment", 'Int'>
    readonly recordedById: FieldRef<"LoanInstallment", 'String'>
    readonly createdAt: FieldRef<"LoanInstallment", 'DateTime'>
    readonly updatedAt: FieldRef<"LoanInstallment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LoanInstallment findUnique
   */
  export type LoanInstallmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    /**
     * Filter, which LoanInstallment to fetch.
     */
    where: LoanInstallmentWhereUniqueInput
  }

  /**
   * LoanInstallment findUniqueOrThrow
   */
  export type LoanInstallmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    /**
     * Filter, which LoanInstallment to fetch.
     */
    where: LoanInstallmentWhereUniqueInput
  }

  /**
   * LoanInstallment findFirst
   */
  export type LoanInstallmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    /**
     * Filter, which LoanInstallment to fetch.
     */
    where?: LoanInstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanInstallments to fetch.
     */
    orderBy?: LoanInstallmentOrderByWithRelationInput | LoanInstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanInstallments.
     */
    cursor?: LoanInstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanInstallments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanInstallments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanInstallments.
     */
    distinct?: LoanInstallmentScalarFieldEnum | LoanInstallmentScalarFieldEnum[]
  }

  /**
   * LoanInstallment findFirstOrThrow
   */
  export type LoanInstallmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    /**
     * Filter, which LoanInstallment to fetch.
     */
    where?: LoanInstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanInstallments to fetch.
     */
    orderBy?: LoanInstallmentOrderByWithRelationInput | LoanInstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LoanInstallments.
     */
    cursor?: LoanInstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanInstallments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanInstallments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LoanInstallments.
     */
    distinct?: LoanInstallmentScalarFieldEnum | LoanInstallmentScalarFieldEnum[]
  }

  /**
   * LoanInstallment findMany
   */
  export type LoanInstallmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    /**
     * Filter, which LoanInstallments to fetch.
     */
    where?: LoanInstallmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LoanInstallments to fetch.
     */
    orderBy?: LoanInstallmentOrderByWithRelationInput | LoanInstallmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LoanInstallments.
     */
    cursor?: LoanInstallmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LoanInstallments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LoanInstallments.
     */
    skip?: number
    distinct?: LoanInstallmentScalarFieldEnum | LoanInstallmentScalarFieldEnum[]
  }

  /**
   * LoanInstallment create
   */
  export type LoanInstallmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    /**
     * The data needed to create a LoanInstallment.
     */
    data: XOR<LoanInstallmentCreateInput, LoanInstallmentUncheckedCreateInput>
  }

  /**
   * LoanInstallment createMany
   */
  export type LoanInstallmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LoanInstallments.
     */
    data: LoanInstallmentCreateManyInput | LoanInstallmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LoanInstallment createManyAndReturn
   */
  export type LoanInstallmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * The data used to create many LoanInstallments.
     */
    data: LoanInstallmentCreateManyInput | LoanInstallmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoanInstallment update
   */
  export type LoanInstallmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    /**
     * The data needed to update a LoanInstallment.
     */
    data: XOR<LoanInstallmentUpdateInput, LoanInstallmentUncheckedUpdateInput>
    /**
     * Choose, which LoanInstallment to update.
     */
    where: LoanInstallmentWhereUniqueInput
  }

  /**
   * LoanInstallment updateMany
   */
  export type LoanInstallmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LoanInstallments.
     */
    data: XOR<LoanInstallmentUpdateManyMutationInput, LoanInstallmentUncheckedUpdateManyInput>
    /**
     * Filter which LoanInstallments to update
     */
    where?: LoanInstallmentWhereInput
    /**
     * Limit how many LoanInstallments to update.
     */
    limit?: number
  }

  /**
   * LoanInstallment updateManyAndReturn
   */
  export type LoanInstallmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * The data used to update LoanInstallments.
     */
    data: XOR<LoanInstallmentUpdateManyMutationInput, LoanInstallmentUncheckedUpdateManyInput>
    /**
     * Filter which LoanInstallments to update
     */
    where?: LoanInstallmentWhereInput
    /**
     * Limit how many LoanInstallments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LoanInstallment upsert
   */
  export type LoanInstallmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    /**
     * The filter to search for the LoanInstallment to update in case it exists.
     */
    where: LoanInstallmentWhereUniqueInput
    /**
     * In case the LoanInstallment found by the `where` argument doesn't exist, create a new LoanInstallment with this data.
     */
    create: XOR<LoanInstallmentCreateInput, LoanInstallmentUncheckedCreateInput>
    /**
     * In case the LoanInstallment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanInstallmentUpdateInput, LoanInstallmentUncheckedUpdateInput>
  }

  /**
   * LoanInstallment delete
   */
  export type LoanInstallmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
    /**
     * Filter which LoanInstallment to delete.
     */
    where: LoanInstallmentWhereUniqueInput
  }

  /**
   * LoanInstallment deleteMany
   */
  export type LoanInstallmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LoanInstallments to delete
     */
    where?: LoanInstallmentWhereInput
    /**
     * Limit how many LoanInstallments to delete.
     */
    limit?: number
  }

  /**
   * LoanInstallment.recordedBy
   */
  export type LoanInstallment$recordedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * LoanInstallment without action
   */
  export type LoanInstallmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoanInstallment
     */
    select?: LoanInstallmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LoanInstallment
     */
    omit?: LoanInstallmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInstallmentInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    adminId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    adminId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    adminId: number
    action: number
    entity: number
    entityId: number
    oldValue: number
    newValue: number
    ipAddress: number
    userAgent: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    adminId?: true
    action?: true
    entity?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    adminId?: true
    action?: true
    entity?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    adminId?: true
    action?: true
    entity?: true
    entityId?: true
    oldValue?: true
    newValue?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    adminId: string
    action: string
    entity: string
    entityId: string | null
    oldValue: JsonValue | null
    newValue: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    adminId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminId" | "action" | "entity" | "entityId" | "oldValue" | "newValue" | "ipAddress" | "userAgent" | "timestamp", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      admin: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminId: string
      action: string
      entity: string
      entityId: string | null
      oldValue: Prisma.JsonValue | null
      newValue: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly adminId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly oldValue: FieldRef<"AuditLog", 'Json'>
    readonly newValue: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model Setting
   */

  export type AggregateSetting = {
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  export type SettingMinAggregateOutputType = {
    key: string | null
    updatedAt: Date | null
  }

  export type SettingMaxAggregateOutputType = {
    key: string | null
    updatedAt: Date | null
  }

  export type SettingCountAggregateOutputType = {
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type SettingMinAggregateInputType = {
    key?: true
    updatedAt?: true
  }

  export type SettingMaxAggregateInputType = {
    key?: true
    updatedAt?: true
  }

  export type SettingCountAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setting to aggregate.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingMaxAggregateInputType
  }

  export type GetSettingAggregateType<T extends SettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetting[P]>
      : GetScalarType<T[P], AggregateSetting[P]>
  }




  export type SettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingWhereInput
    orderBy?: SettingOrderByWithAggregationInput | SettingOrderByWithAggregationInput[]
    by: SettingScalarFieldEnum[] | SettingScalarFieldEnum
    having?: SettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingCountAggregateInputType | true
    _min?: SettingMinAggregateInputType
    _max?: SettingMaxAggregateInputType
  }

  export type SettingGroupByOutputType = {
    key: string
    value: JsonValue
    updatedAt: Date
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  type GetSettingGroupByPayload<T extends SettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingGroupByOutputType[P]>
            : GetScalarType<T[P], SettingGroupByOutputType[P]>
        }
      >
    >


  export type SettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectScalar = {
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }

  export type SettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"key" | "value" | "updatedAt", ExtArgs["result"]["setting"]>

  export type $SettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Setting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: Prisma.JsonValue
      updatedAt: Date
    }, ExtArgs["result"]["setting"]>
    composites: {}
  }

  type SettingGetPayload<S extends boolean | null | undefined | SettingDefaultArgs> = $Result.GetResult<Prisma.$SettingPayload, S>

  type SettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SettingCountAggregateInputType | true
    }

  export interface SettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Setting'], meta: { name: 'Setting' } }
    /**
     * Find zero or one Setting that matches the filter.
     * @param {SettingFindUniqueArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingFindUniqueArgs>(args: SelectSubset<T, SettingFindUniqueArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Setting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SettingFindUniqueOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Setting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingFindFirstArgs>(args?: SelectSubset<T, SettingFindFirstArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Setting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.setting.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.setting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const settingWithKeyOnly = await prisma.setting.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends SettingFindManyArgs>(args?: SelectSubset<T, SettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Setting.
     * @param {SettingCreateArgs} args - Arguments to create a Setting.
     * @example
     * // Create one Setting
     * const Setting = await prisma.setting.create({
     *   data: {
     *     // ... data to create a Setting
     *   }
     * })
     * 
     */
    create<T extends SettingCreateArgs>(args: SelectSubset<T, SettingCreateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Settings.
     * @param {SettingCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingCreateManyArgs>(args?: SelectSubset<T, SettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `key`
     * const settingWithKeyOnly = await prisma.setting.createManyAndReturn({
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Setting.
     * @param {SettingDeleteArgs} args - Arguments to delete one Setting.
     * @example
     * // Delete one Setting
     * const Setting = await prisma.setting.delete({
     *   where: {
     *     // ... filter to delete one Setting
     *   }
     * })
     * 
     */
    delete<T extends SettingDeleteArgs>(args: SelectSubset<T, SettingDeleteArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Setting.
     * @param {SettingUpdateArgs} args - Arguments to update one Setting.
     * @example
     * // Update one Setting
     * const setting = await prisma.setting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingUpdateArgs>(args: SelectSubset<T, SettingUpdateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Settings.
     * @param {SettingDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.setting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingDeleteManyArgs>(args?: SelectSubset<T, SettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingUpdateManyArgs>(args: SelectSubset<T, SettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings and returns the data updated in the database.
     * @param {SettingUpdateManyAndReturnArgs} args - Arguments to update many Settings.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Settings and only return the `key`
     * const settingWithKeyOnly = await prisma.setting.updateManyAndReturn({
     *   select: { key: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Setting.
     * @param {SettingUpsertArgs} args - Arguments to update or create a Setting.
     * @example
     * // Update or create a Setting
     * const setting = await prisma.setting.upsert({
     *   create: {
     *     // ... data to create a Setting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setting we want to update
     *   }
     * })
     */
    upsert<T extends SettingUpsertArgs>(args: SelectSubset<T, SettingUpsertArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.setting.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingCountArgs>(
      args?: Subset<T, SettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingAggregateArgs>(args: Subset<T, SettingAggregateArgs>): Prisma.PrismaPromise<GetSettingAggregateType<T>>

    /**
     * Group by Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingGroupByArgs['orderBy'] }
        : { orderBy?: SettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Setting model
   */
  readonly fields: SettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Setting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Setting model
   */
  interface SettingFieldRefs {
    readonly key: FieldRef<"Setting", 'String'>
    readonly value: FieldRef<"Setting", 'Json'>
    readonly updatedAt: FieldRef<"Setting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Setting findUnique
   */
  export type SettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findUniqueOrThrow
   */
  export type SettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findFirst
   */
  export type SettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findFirstOrThrow
   */
  export type SettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findMany
   */
  export type SettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting create
   */
  export type SettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data needed to create a Setting.
     */
    data: XOR<SettingCreateInput, SettingUncheckedCreateInput>
  }

  /**
   * Setting createMany
   */
  export type SettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setting createManyAndReturn
   */
  export type SettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setting update
   */
  export type SettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data needed to update a Setting.
     */
    data: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
    /**
     * Choose, which Setting to update.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting updateMany
   */
  export type SettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Setting updateManyAndReturn
   */
  export type SettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Setting upsert
   */
  export type SettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The filter to search for the Setting to update in case it exists.
     */
    where: SettingWhereUniqueInput
    /**
     * In case the Setting found by the `where` argument doesn't exist, create a new Setting with this data.
     */
    create: XOR<SettingCreateInput, SettingUncheckedCreateInput>
    /**
     * In case the Setting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
  }

  /**
   * Setting delete
   */
  export type SettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter which Setting to delete.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting deleteMany
   */
  export type SettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingWhereInput
    /**
     * Limit how many Settings to delete.
     */
    limit?: number
  }

  /**
   * Setting without action
   */
  export type SettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MemberScalarFieldEnum: {
    id: 'id',
    memberUid: 'memberUid',
    fullName: 'fullName',
    phone: 'phone',
    email: 'email',
    address: 'address',
    joinDate: 'joinDate',
    exitDate: 'exitDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum]


  export const ContributionRuleScalarFieldEnum: {
    id: 'id',
    amountPaise: 'amountPaise',
    effectiveFromMonth: 'effectiveFromMonth',
    effectiveFromYear: 'effectiveFromYear',
    createdById: 'createdById',
    createdAt: 'createdAt'
  };

  export type ContributionRuleScalarFieldEnum = (typeof ContributionRuleScalarFieldEnum)[keyof typeof ContributionRuleScalarFieldEnum]


  export const PenaltyRuleScalarFieldEnum: {
    id: 'id',
    amountPaise: 'amountPaise',
    effectiveFrom: 'effectiveFrom',
    createdById: 'createdById',
    createdAt: 'createdAt'
  };

  export type PenaltyRuleScalarFieldEnum = (typeof PenaltyRuleScalarFieldEnum)[keyof typeof PenaltyRuleScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    month: 'month',
    year: 'year',
    baseAmountPaise: 'baseAmountPaise',
    penaltyAmountPaise: 'penaltyAmountPaise',
    totalAmountPaise: 'totalAmountPaise',
    status: 'status',
    paymentMethod: 'paymentMethod',
    paidAt: 'paidAt',
    recordedById: 'recordedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const ReceiptScalarFieldEnum: {
    id: 'id',
    paymentId: 'paymentId',
    receiptNumber: 'receiptNumber',
    pdfUrl: 'pdfUrl',
    createdAt: 'createdAt'
  };

  export type ReceiptScalarFieldEnum = (typeof ReceiptScalarFieldEnum)[keyof typeof ReceiptScalarFieldEnum]


  export const CharityScalarFieldEnum: {
    id: 'id',
    title: 'title',
    beneficiary: 'beneficiary',
    purpose: 'purpose',
    amountPaise: 'amountPaise',
    date: 'date',
    notes: 'notes',
    imageUrl: 'imageUrl',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CharityScalarFieldEnum = (typeof CharityScalarFieldEnum)[keyof typeof CharityScalarFieldEnum]


  export const LoanScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    principalPaise: 'principalPaise',
    monthlyRateBps: 'monthlyRateBps',
    durationMonths: 'durationMonths',
    startDate: 'startDate',
    status: 'status',
    termsJson: 'termsJson',
    createdById: 'createdById',
    approvedById: 'approvedById',
    approvedAt: 'approvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoanScalarFieldEnum = (typeof LoanScalarFieldEnum)[keyof typeof LoanScalarFieldEnum]


  export const LoanInstallmentScalarFieldEnum: {
    id: 'id',
    loanId: 'loanId',
    installmentNumber: 'installmentNumber',
    dueDate: 'dueDate',
    interestDuePaise: 'interestDuePaise',
    principalDuePaise: 'principalDuePaise',
    amountPaidPaise: 'amountPaidPaise',
    paidAt: 'paidAt',
    overdueInterestPaise: 'overdueInterestPaise',
    recordedById: 'recordedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LoanInstallmentScalarFieldEnum = (typeof LoanInstallmentScalarFieldEnum)[keyof typeof LoanInstallmentScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    adminId: 'adminId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    oldValue: 'oldValue',
    newValue: 'newValue',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SettingScalarFieldEnum: {
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type SettingScalarFieldEnum = (typeof SettingScalarFieldEnum)[keyof typeof SettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'MemberStatus'
   */
  export type EnumMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberStatus'>
    


  /**
   * Reference to a field of type 'MemberStatus[]'
   */
  export type ListEnumMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'LoanStatus'
   */
  export type EnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus'>
    


  /**
   * Reference to a field of type 'LoanStatus[]'
   */
  export type ListEnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    contributionRulesCreated?: ContributionRuleListRelationFilter
    penaltyRulesCreated?: PenaltyRuleListRelationFilter
    paymentsRecorded?: PaymentListRelationFilter
    charitiesCreated?: CharityListRelationFilter
    loansCreated?: LoanListRelationFilter
    loansApproved?: LoanListRelationFilter
    installmentsRecorded?: LoanInstallmentListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contributionRulesCreated?: ContributionRuleOrderByRelationAggregateInput
    penaltyRulesCreated?: PenaltyRuleOrderByRelationAggregateInput
    paymentsRecorded?: PaymentOrderByRelationAggregateInput
    charitiesCreated?: CharityOrderByRelationAggregateInput
    loansCreated?: LoanOrderByRelationAggregateInput
    loansApproved?: LoanOrderByRelationAggregateInput
    installmentsRecorded?: LoanInstallmentOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    contributionRulesCreated?: ContributionRuleListRelationFilter
    penaltyRulesCreated?: PenaltyRuleListRelationFilter
    paymentsRecorded?: PaymentListRelationFilter
    charitiesCreated?: CharityListRelationFilter
    loansCreated?: LoanListRelationFilter
    loansApproved?: LoanListRelationFilter
    installmentsRecorded?: LoanInstallmentListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MemberWhereInput = {
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    id?: StringFilter<"Member"> | string
    memberUid?: StringFilter<"Member"> | string
    fullName?: StringFilter<"Member"> | string
    phone?: StringNullableFilter<"Member"> | string | null
    email?: StringNullableFilter<"Member"> | string | null
    address?: StringNullableFilter<"Member"> | string | null
    joinDate?: DateTimeFilter<"Member"> | Date | string
    exitDate?: DateTimeNullableFilter<"Member"> | Date | string | null
    status?: EnumMemberStatusFilter<"Member"> | $Enums.MemberStatus
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    payments?: PaymentListRelationFilter
    loans?: LoanListRelationFilter
  }

  export type MemberOrderByWithRelationInput = {
    id?: SortOrder
    memberUid?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    joinDate?: SortOrder
    exitDate?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    payments?: PaymentOrderByRelationAggregateInput
    loans?: LoanOrderByRelationAggregateInput
  }

  export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    memberUid?: string
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    fullName?: StringFilter<"Member"> | string
    phone?: StringNullableFilter<"Member"> | string | null
    email?: StringNullableFilter<"Member"> | string | null
    address?: StringNullableFilter<"Member"> | string | null
    joinDate?: DateTimeFilter<"Member"> | Date | string
    exitDate?: DateTimeNullableFilter<"Member"> | Date | string | null
    status?: EnumMemberStatusFilter<"Member"> | $Enums.MemberStatus
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    payments?: PaymentListRelationFilter
    loans?: LoanListRelationFilter
  }, "id" | "memberUid">

  export type MemberOrderByWithAggregationInput = {
    id?: SortOrder
    memberUid?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    joinDate?: SortOrder
    exitDate?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberCountOrderByAggregateInput
    _max?: MemberMaxOrderByAggregateInput
    _min?: MemberMinOrderByAggregateInput
  }

  export type MemberScalarWhereWithAggregatesInput = {
    AND?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    OR?: MemberScalarWhereWithAggregatesInput[]
    NOT?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Member"> | string
    memberUid?: StringWithAggregatesFilter<"Member"> | string
    fullName?: StringWithAggregatesFilter<"Member"> | string
    phone?: StringNullableWithAggregatesFilter<"Member"> | string | null
    email?: StringNullableWithAggregatesFilter<"Member"> | string | null
    address?: StringNullableWithAggregatesFilter<"Member"> | string | null
    joinDate?: DateTimeWithAggregatesFilter<"Member"> | Date | string
    exitDate?: DateTimeNullableWithAggregatesFilter<"Member"> | Date | string | null
    status?: EnumMemberStatusWithAggregatesFilter<"Member"> | $Enums.MemberStatus
    createdAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
  }

  export type ContributionRuleWhereInput = {
    AND?: ContributionRuleWhereInput | ContributionRuleWhereInput[]
    OR?: ContributionRuleWhereInput[]
    NOT?: ContributionRuleWhereInput | ContributionRuleWhereInput[]
    id?: StringFilter<"ContributionRule"> | string
    amountPaise?: IntFilter<"ContributionRule"> | number
    effectiveFromMonth?: IntFilter<"ContributionRule"> | number
    effectiveFromYear?: IntFilter<"ContributionRule"> | number
    createdById?: StringFilter<"ContributionRule"> | string
    createdAt?: DateTimeFilter<"ContributionRule"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ContributionRuleOrderByWithRelationInput = {
    id?: SortOrder
    amountPaise?: SortOrder
    effectiveFromMonth?: SortOrder
    effectiveFromYear?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
  }

  export type ContributionRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    effectiveFromMonth_effectiveFromYear?: ContributionRuleEffectiveFromMonthEffectiveFromYearCompoundUniqueInput
    AND?: ContributionRuleWhereInput | ContributionRuleWhereInput[]
    OR?: ContributionRuleWhereInput[]
    NOT?: ContributionRuleWhereInput | ContributionRuleWhereInput[]
    amountPaise?: IntFilter<"ContributionRule"> | number
    effectiveFromMonth?: IntFilter<"ContributionRule"> | number
    effectiveFromYear?: IntFilter<"ContributionRule"> | number
    createdById?: StringFilter<"ContributionRule"> | string
    createdAt?: DateTimeFilter<"ContributionRule"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "effectiveFromMonth_effectiveFromYear">

  export type ContributionRuleOrderByWithAggregationInput = {
    id?: SortOrder
    amountPaise?: SortOrder
    effectiveFromMonth?: SortOrder
    effectiveFromYear?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    _count?: ContributionRuleCountOrderByAggregateInput
    _avg?: ContributionRuleAvgOrderByAggregateInput
    _max?: ContributionRuleMaxOrderByAggregateInput
    _min?: ContributionRuleMinOrderByAggregateInput
    _sum?: ContributionRuleSumOrderByAggregateInput
  }

  export type ContributionRuleScalarWhereWithAggregatesInput = {
    AND?: ContributionRuleScalarWhereWithAggregatesInput | ContributionRuleScalarWhereWithAggregatesInput[]
    OR?: ContributionRuleScalarWhereWithAggregatesInput[]
    NOT?: ContributionRuleScalarWhereWithAggregatesInput | ContributionRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContributionRule"> | string
    amountPaise?: IntWithAggregatesFilter<"ContributionRule"> | number
    effectiveFromMonth?: IntWithAggregatesFilter<"ContributionRule"> | number
    effectiveFromYear?: IntWithAggregatesFilter<"ContributionRule"> | number
    createdById?: StringWithAggregatesFilter<"ContributionRule"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ContributionRule"> | Date | string
  }

  export type PenaltyRuleWhereInput = {
    AND?: PenaltyRuleWhereInput | PenaltyRuleWhereInput[]
    OR?: PenaltyRuleWhereInput[]
    NOT?: PenaltyRuleWhereInput | PenaltyRuleWhereInput[]
    id?: StringFilter<"PenaltyRule"> | string
    amountPaise?: IntFilter<"PenaltyRule"> | number
    effectiveFrom?: DateTimeFilter<"PenaltyRule"> | Date | string
    createdById?: StringFilter<"PenaltyRule"> | string
    createdAt?: DateTimeFilter<"PenaltyRule"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PenaltyRuleOrderByWithRelationInput = {
    id?: SortOrder
    amountPaise?: SortOrder
    effectiveFrom?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
  }

  export type PenaltyRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    effectiveFrom?: Date | string
    AND?: PenaltyRuleWhereInput | PenaltyRuleWhereInput[]
    OR?: PenaltyRuleWhereInput[]
    NOT?: PenaltyRuleWhereInput | PenaltyRuleWhereInput[]
    amountPaise?: IntFilter<"PenaltyRule"> | number
    createdById?: StringFilter<"PenaltyRule"> | string
    createdAt?: DateTimeFilter<"PenaltyRule"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "effectiveFrom">

  export type PenaltyRuleOrderByWithAggregationInput = {
    id?: SortOrder
    amountPaise?: SortOrder
    effectiveFrom?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    _count?: PenaltyRuleCountOrderByAggregateInput
    _avg?: PenaltyRuleAvgOrderByAggregateInput
    _max?: PenaltyRuleMaxOrderByAggregateInput
    _min?: PenaltyRuleMinOrderByAggregateInput
    _sum?: PenaltyRuleSumOrderByAggregateInput
  }

  export type PenaltyRuleScalarWhereWithAggregatesInput = {
    AND?: PenaltyRuleScalarWhereWithAggregatesInput | PenaltyRuleScalarWhereWithAggregatesInput[]
    OR?: PenaltyRuleScalarWhereWithAggregatesInput[]
    NOT?: PenaltyRuleScalarWhereWithAggregatesInput | PenaltyRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PenaltyRule"> | string
    amountPaise?: IntWithAggregatesFilter<"PenaltyRule"> | number
    effectiveFrom?: DateTimeWithAggregatesFilter<"PenaltyRule"> | Date | string
    createdById?: StringWithAggregatesFilter<"PenaltyRule"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PenaltyRule"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    memberId?: StringFilter<"Payment"> | string
    month?: IntFilter<"Payment"> | number
    year?: IntFilter<"Payment"> | number
    baseAmountPaise?: IntFilter<"Payment"> | number
    penaltyAmountPaise?: IntFilter<"Payment"> | number
    totalAmountPaise?: IntFilter<"Payment"> | number
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: EnumPaymentMethodNullableFilter<"Payment"> | $Enums.PaymentMethod | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    recordedById?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    recordedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    receipt?: XOR<ReceiptNullableScalarRelationFilter, ReceiptWhereInput> | null
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    month?: SortOrder
    year?: SortOrder
    baseAmountPaise?: SortOrder
    penaltyAmountPaise?: SortOrder
    totalAmountPaise?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    recordedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    member?: MemberOrderByWithRelationInput
    recordedBy?: UserOrderByWithRelationInput
    receipt?: ReceiptOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    memberId_month_year?: PaymentMemberIdMonthYearCompoundUniqueInput
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    memberId?: StringFilter<"Payment"> | string
    month?: IntFilter<"Payment"> | number
    year?: IntFilter<"Payment"> | number
    baseAmountPaise?: IntFilter<"Payment"> | number
    penaltyAmountPaise?: IntFilter<"Payment"> | number
    totalAmountPaise?: IntFilter<"Payment"> | number
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: EnumPaymentMethodNullableFilter<"Payment"> | $Enums.PaymentMethod | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    recordedById?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    recordedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    receipt?: XOR<ReceiptNullableScalarRelationFilter, ReceiptWhereInput> | null
  }, "id" | "memberId_month_year">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    month?: SortOrder
    year?: SortOrder
    baseAmountPaise?: SortOrder
    penaltyAmountPaise?: SortOrder
    totalAmountPaise?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    recordedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    memberId?: StringWithAggregatesFilter<"Payment"> | string
    month?: IntWithAggregatesFilter<"Payment"> | number
    year?: IntWithAggregatesFilter<"Payment"> | number
    baseAmountPaise?: IntWithAggregatesFilter<"Payment"> | number
    penaltyAmountPaise?: IntWithAggregatesFilter<"Payment"> | number
    totalAmountPaise?: IntWithAggregatesFilter<"Payment"> | number
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: EnumPaymentMethodNullableWithAggregatesFilter<"Payment"> | $Enums.PaymentMethod | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    recordedById?: StringWithAggregatesFilter<"Payment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type ReceiptWhereInput = {
    AND?: ReceiptWhereInput | ReceiptWhereInput[]
    OR?: ReceiptWhereInput[]
    NOT?: ReceiptWhereInput | ReceiptWhereInput[]
    id?: StringFilter<"Receipt"> | string
    paymentId?: StringFilter<"Receipt"> | string
    receiptNumber?: StringFilter<"Receipt"> | string
    pdfUrl?: StringNullableFilter<"Receipt"> | string | null
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    payment?: XOR<PaymentScalarRelationFilter, PaymentWhereInput>
  }

  export type ReceiptOrderByWithRelationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    receiptNumber?: SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    payment?: PaymentOrderByWithRelationInput
  }

  export type ReceiptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    paymentId?: string
    receiptNumber?: string
    AND?: ReceiptWhereInput | ReceiptWhereInput[]
    OR?: ReceiptWhereInput[]
    NOT?: ReceiptWhereInput | ReceiptWhereInput[]
    pdfUrl?: StringNullableFilter<"Receipt"> | string | null
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    payment?: XOR<PaymentScalarRelationFilter, PaymentWhereInput>
  }, "id" | "paymentId" | "receiptNumber">

  export type ReceiptOrderByWithAggregationInput = {
    id?: SortOrder
    paymentId?: SortOrder
    receiptNumber?: SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ReceiptCountOrderByAggregateInput
    _max?: ReceiptMaxOrderByAggregateInput
    _min?: ReceiptMinOrderByAggregateInput
  }

  export type ReceiptScalarWhereWithAggregatesInput = {
    AND?: ReceiptScalarWhereWithAggregatesInput | ReceiptScalarWhereWithAggregatesInput[]
    OR?: ReceiptScalarWhereWithAggregatesInput[]
    NOT?: ReceiptScalarWhereWithAggregatesInput | ReceiptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Receipt"> | string
    paymentId?: StringWithAggregatesFilter<"Receipt"> | string
    receiptNumber?: StringWithAggregatesFilter<"Receipt"> | string
    pdfUrl?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Receipt"> | Date | string
  }

  export type CharityWhereInput = {
    AND?: CharityWhereInput | CharityWhereInput[]
    OR?: CharityWhereInput[]
    NOT?: CharityWhereInput | CharityWhereInput[]
    id?: StringFilter<"Charity"> | string
    title?: StringFilter<"Charity"> | string
    beneficiary?: StringFilter<"Charity"> | string
    purpose?: StringNullableFilter<"Charity"> | string | null
    amountPaise?: IntFilter<"Charity"> | number
    date?: DateTimeFilter<"Charity"> | Date | string
    notes?: StringNullableFilter<"Charity"> | string | null
    imageUrl?: StringNullableFilter<"Charity"> | string | null
    createdById?: StringFilter<"Charity"> | string
    createdAt?: DateTimeFilter<"Charity"> | Date | string
    updatedAt?: DateTimeFilter<"Charity"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CharityOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    beneficiary?: SortOrder
    purpose?: SortOrderInput | SortOrder
    amountPaise?: SortOrder
    date?: SortOrder
    notes?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
  }

  export type CharityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CharityWhereInput | CharityWhereInput[]
    OR?: CharityWhereInput[]
    NOT?: CharityWhereInput | CharityWhereInput[]
    title?: StringFilter<"Charity"> | string
    beneficiary?: StringFilter<"Charity"> | string
    purpose?: StringNullableFilter<"Charity"> | string | null
    amountPaise?: IntFilter<"Charity"> | number
    date?: DateTimeFilter<"Charity"> | Date | string
    notes?: StringNullableFilter<"Charity"> | string | null
    imageUrl?: StringNullableFilter<"Charity"> | string | null
    createdById?: StringFilter<"Charity"> | string
    createdAt?: DateTimeFilter<"Charity"> | Date | string
    updatedAt?: DateTimeFilter<"Charity"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CharityOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    beneficiary?: SortOrder
    purpose?: SortOrderInput | SortOrder
    amountPaise?: SortOrder
    date?: SortOrder
    notes?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CharityCountOrderByAggregateInput
    _avg?: CharityAvgOrderByAggregateInput
    _max?: CharityMaxOrderByAggregateInput
    _min?: CharityMinOrderByAggregateInput
    _sum?: CharitySumOrderByAggregateInput
  }

  export type CharityScalarWhereWithAggregatesInput = {
    AND?: CharityScalarWhereWithAggregatesInput | CharityScalarWhereWithAggregatesInput[]
    OR?: CharityScalarWhereWithAggregatesInput[]
    NOT?: CharityScalarWhereWithAggregatesInput | CharityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Charity"> | string
    title?: StringWithAggregatesFilter<"Charity"> | string
    beneficiary?: StringWithAggregatesFilter<"Charity"> | string
    purpose?: StringNullableWithAggregatesFilter<"Charity"> | string | null
    amountPaise?: IntWithAggregatesFilter<"Charity"> | number
    date?: DateTimeWithAggregatesFilter<"Charity"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"Charity"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Charity"> | string | null
    createdById?: StringWithAggregatesFilter<"Charity"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Charity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Charity"> | Date | string
  }

  export type LoanWhereInput = {
    AND?: LoanWhereInput | LoanWhereInput[]
    OR?: LoanWhereInput[]
    NOT?: LoanWhereInput | LoanWhereInput[]
    id?: StringFilter<"Loan"> | string
    memberId?: StringFilter<"Loan"> | string
    principalPaise?: IntFilter<"Loan"> | number
    monthlyRateBps?: IntFilter<"Loan"> | number
    durationMonths?: IntFilter<"Loan"> | number
    startDate?: DateTimeFilter<"Loan"> | Date | string
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    termsJson?: JsonNullableFilter<"Loan">
    createdById?: StringFilter<"Loan"> | string
    approvedById?: StringNullableFilter<"Loan"> | string | null
    approvedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    updatedAt?: DateTimeFilter<"Loan"> | Date | string
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    approvedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    installments?: LoanInstallmentListRelationFilter
  }

  export type LoanOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    principalPaise?: SortOrder
    monthlyRateBps?: SortOrder
    durationMonths?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    termsJson?: SortOrderInput | SortOrder
    createdById?: SortOrder
    approvedById?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    member?: MemberOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    approvedBy?: UserOrderByWithRelationInput
    installments?: LoanInstallmentOrderByRelationAggregateInput
  }

  export type LoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoanWhereInput | LoanWhereInput[]
    OR?: LoanWhereInput[]
    NOT?: LoanWhereInput | LoanWhereInput[]
    memberId?: StringFilter<"Loan"> | string
    principalPaise?: IntFilter<"Loan"> | number
    monthlyRateBps?: IntFilter<"Loan"> | number
    durationMonths?: IntFilter<"Loan"> | number
    startDate?: DateTimeFilter<"Loan"> | Date | string
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    termsJson?: JsonNullableFilter<"Loan">
    createdById?: StringFilter<"Loan"> | string
    approvedById?: StringNullableFilter<"Loan"> | string | null
    approvedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    updatedAt?: DateTimeFilter<"Loan"> | Date | string
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    approvedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    installments?: LoanInstallmentListRelationFilter
  }, "id">

  export type LoanOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    principalPaise?: SortOrder
    monthlyRateBps?: SortOrder
    durationMonths?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    termsJson?: SortOrderInput | SortOrder
    createdById?: SortOrder
    approvedById?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoanCountOrderByAggregateInput
    _avg?: LoanAvgOrderByAggregateInput
    _max?: LoanMaxOrderByAggregateInput
    _min?: LoanMinOrderByAggregateInput
    _sum?: LoanSumOrderByAggregateInput
  }

  export type LoanScalarWhereWithAggregatesInput = {
    AND?: LoanScalarWhereWithAggregatesInput | LoanScalarWhereWithAggregatesInput[]
    OR?: LoanScalarWhereWithAggregatesInput[]
    NOT?: LoanScalarWhereWithAggregatesInput | LoanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Loan"> | string
    memberId?: StringWithAggregatesFilter<"Loan"> | string
    principalPaise?: IntWithAggregatesFilter<"Loan"> | number
    monthlyRateBps?: IntWithAggregatesFilter<"Loan"> | number
    durationMonths?: IntWithAggregatesFilter<"Loan"> | number
    startDate?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
    status?: EnumLoanStatusWithAggregatesFilter<"Loan"> | $Enums.LoanStatus
    termsJson?: JsonNullableWithAggregatesFilter<"Loan">
    createdById?: StringWithAggregatesFilter<"Loan"> | string
    approvedById?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
  }

  export type LoanInstallmentWhereInput = {
    AND?: LoanInstallmentWhereInput | LoanInstallmentWhereInput[]
    OR?: LoanInstallmentWhereInput[]
    NOT?: LoanInstallmentWhereInput | LoanInstallmentWhereInput[]
    id?: StringFilter<"LoanInstallment"> | string
    loanId?: StringFilter<"LoanInstallment"> | string
    installmentNumber?: IntFilter<"LoanInstallment"> | number
    dueDate?: DateTimeFilter<"LoanInstallment"> | Date | string
    interestDuePaise?: IntFilter<"LoanInstallment"> | number
    principalDuePaise?: IntFilter<"LoanInstallment"> | number
    amountPaidPaise?: IntFilter<"LoanInstallment"> | number
    paidAt?: DateTimeNullableFilter<"LoanInstallment"> | Date | string | null
    overdueInterestPaise?: IntFilter<"LoanInstallment"> | number
    recordedById?: StringNullableFilter<"LoanInstallment"> | string | null
    createdAt?: DateTimeFilter<"LoanInstallment"> | Date | string
    updatedAt?: DateTimeFilter<"LoanInstallment"> | Date | string
    loan?: XOR<LoanScalarRelationFilter, LoanWhereInput>
    recordedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type LoanInstallmentOrderByWithRelationInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNumber?: SortOrder
    dueDate?: SortOrder
    interestDuePaise?: SortOrder
    principalDuePaise?: SortOrder
    amountPaidPaise?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    overdueInterestPaise?: SortOrder
    recordedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    loan?: LoanOrderByWithRelationInput
    recordedBy?: UserOrderByWithRelationInput
  }

  export type LoanInstallmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    loanId_installmentNumber?: LoanInstallmentLoanIdInstallmentNumberCompoundUniqueInput
    AND?: LoanInstallmentWhereInput | LoanInstallmentWhereInput[]
    OR?: LoanInstallmentWhereInput[]
    NOT?: LoanInstallmentWhereInput | LoanInstallmentWhereInput[]
    loanId?: StringFilter<"LoanInstallment"> | string
    installmentNumber?: IntFilter<"LoanInstallment"> | number
    dueDate?: DateTimeFilter<"LoanInstallment"> | Date | string
    interestDuePaise?: IntFilter<"LoanInstallment"> | number
    principalDuePaise?: IntFilter<"LoanInstallment"> | number
    amountPaidPaise?: IntFilter<"LoanInstallment"> | number
    paidAt?: DateTimeNullableFilter<"LoanInstallment"> | Date | string | null
    overdueInterestPaise?: IntFilter<"LoanInstallment"> | number
    recordedById?: StringNullableFilter<"LoanInstallment"> | string | null
    createdAt?: DateTimeFilter<"LoanInstallment"> | Date | string
    updatedAt?: DateTimeFilter<"LoanInstallment"> | Date | string
    loan?: XOR<LoanScalarRelationFilter, LoanWhereInput>
    recordedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "loanId_installmentNumber">

  export type LoanInstallmentOrderByWithAggregationInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNumber?: SortOrder
    dueDate?: SortOrder
    interestDuePaise?: SortOrder
    principalDuePaise?: SortOrder
    amountPaidPaise?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    overdueInterestPaise?: SortOrder
    recordedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LoanInstallmentCountOrderByAggregateInput
    _avg?: LoanInstallmentAvgOrderByAggregateInput
    _max?: LoanInstallmentMaxOrderByAggregateInput
    _min?: LoanInstallmentMinOrderByAggregateInput
    _sum?: LoanInstallmentSumOrderByAggregateInput
  }

  export type LoanInstallmentScalarWhereWithAggregatesInput = {
    AND?: LoanInstallmentScalarWhereWithAggregatesInput | LoanInstallmentScalarWhereWithAggregatesInput[]
    OR?: LoanInstallmentScalarWhereWithAggregatesInput[]
    NOT?: LoanInstallmentScalarWhereWithAggregatesInput | LoanInstallmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LoanInstallment"> | string
    loanId?: StringWithAggregatesFilter<"LoanInstallment"> | string
    installmentNumber?: IntWithAggregatesFilter<"LoanInstallment"> | number
    dueDate?: DateTimeWithAggregatesFilter<"LoanInstallment"> | Date | string
    interestDuePaise?: IntWithAggregatesFilter<"LoanInstallment"> | number
    principalDuePaise?: IntWithAggregatesFilter<"LoanInstallment"> | number
    amountPaidPaise?: IntWithAggregatesFilter<"LoanInstallment"> | number
    paidAt?: DateTimeNullableWithAggregatesFilter<"LoanInstallment"> | Date | string | null
    overdueInterestPaise?: IntWithAggregatesFilter<"LoanInstallment"> | number
    recordedById?: StringNullableWithAggregatesFilter<"LoanInstallment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LoanInstallment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LoanInstallment"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    adminId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableFilter<"AuditLog">
    newValue?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    admin?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    adminId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableFilter<"AuditLog">
    newValue?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    adminId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValue?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type SettingWhereInput = {
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    key?: StringFilter<"Setting"> | string
    value?: JsonFilter<"Setting">
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }

  export type SettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    value?: JsonFilter<"Setting">
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }, "key">

  export type SettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingCountOrderByAggregateInput
    _max?: SettingMaxOrderByAggregateInput
    _min?: SettingMinOrderByAggregateInput
  }

  export type SettingScalarWhereWithAggregatesInput = {
    AND?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    OR?: SettingScalarWhereWithAggregatesInput[]
    NOT?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"Setting"> | string
    value?: JsonWithAggregatesFilter<"Setting">
    updatedAt?: DateTimeWithAggregatesFilter<"Setting"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleUncheckedCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleUncheckedCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentUncheckedCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityUncheckedCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanUncheckedCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentUncheckedCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUncheckedUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUncheckedUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUncheckedUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUncheckedUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCreateInput = {
    id?: string
    memberUid: string
    fullName: string
    phone?: string | null
    email?: string | null
    address?: string | null
    joinDate: Date | string
    exitDate?: Date | string | null
    status?: $Enums.MemberStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutMemberInput
    loans?: LoanCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateInput = {
    id?: string
    memberUid: string
    fullName: string
    phone?: string | null
    email?: string | null
    address?: string | null
    joinDate: Date | string
    exitDate?: Date | string | null
    status?: $Enums.MemberStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutMemberInput
    loans?: LoanUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberUid?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    exitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutMemberNestedInput
    loans?: LoanUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberUid?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    exitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutMemberNestedInput
    loans?: LoanUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberCreateManyInput = {
    id?: string
    memberUid: string
    fullName: string
    phone?: string | null
    email?: string | null
    address?: string | null
    joinDate: Date | string
    exitDate?: Date | string | null
    status?: $Enums.MemberStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberUid?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    exitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberUid?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    exitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributionRuleCreateInput = {
    id?: string
    amountPaise: number
    effectiveFromMonth: number
    effectiveFromYear: number
    createdAt?: Date | string
    createdBy: UserCreateNestedOneWithoutContributionRulesCreatedInput
  }

  export type ContributionRuleUncheckedCreateInput = {
    id?: string
    amountPaise: number
    effectiveFromMonth: number
    effectiveFromYear: number
    createdById: string
    createdAt?: Date | string
  }

  export type ContributionRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFromMonth?: IntFieldUpdateOperationsInput | number
    effectiveFromYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutContributionRulesCreatedNestedInput
  }

  export type ContributionRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFromMonth?: IntFieldUpdateOperationsInput | number
    effectiveFromYear?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributionRuleCreateManyInput = {
    id?: string
    amountPaise: number
    effectiveFromMonth: number
    effectiveFromYear: number
    createdById: string
    createdAt?: Date | string
  }

  export type ContributionRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFromMonth?: IntFieldUpdateOperationsInput | number
    effectiveFromYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributionRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFromMonth?: IntFieldUpdateOperationsInput | number
    effectiveFromYear?: IntFieldUpdateOperationsInput | number
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PenaltyRuleCreateInput = {
    id?: string
    amountPaise: number
    effectiveFrom: Date | string
    createdAt?: Date | string
    createdBy: UserCreateNestedOneWithoutPenaltyRulesCreatedInput
  }

  export type PenaltyRuleUncheckedCreateInput = {
    id?: string
    amountPaise: number
    effectiveFrom: Date | string
    createdById: string
    createdAt?: Date | string
  }

  export type PenaltyRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutPenaltyRulesCreatedNestedInput
  }

  export type PenaltyRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PenaltyRuleCreateManyInput = {
    id?: string
    amountPaise: number
    effectiveFrom: Date | string
    createdById: string
    createdAt?: Date | string
  }

  export type PenaltyRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PenaltyRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutPaymentsInput
    recordedBy: UserCreateNestedOneWithoutPaymentsRecordedInput
    receipt?: ReceiptCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    memberId: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    recordedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    receipt?: ReceiptUncheckedCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutPaymentsNestedInput
    recordedBy?: UserUpdateOneRequiredWithoutPaymentsRecordedNestedInput
    receipt?: ReceiptUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt?: ReceiptUncheckedUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentCreateManyInput = {
    id?: string
    memberId: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    recordedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptCreateInput = {
    id?: string
    receiptNumber: string
    pdfUrl?: string | null
    createdAt?: Date | string
    payment: PaymentCreateNestedOneWithoutReceiptInput
  }

  export type ReceiptUncheckedCreateInput = {
    id?: string
    paymentId: string
    receiptNumber: string
    pdfUrl?: string | null
    createdAt?: Date | string
  }

  export type ReceiptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiptNumber?: StringFieldUpdateOperationsInput | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUpdateOneRequiredWithoutReceiptNestedInput
  }

  export type ReceiptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    receiptNumber?: StringFieldUpdateOperationsInput | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptCreateManyInput = {
    id?: string
    paymentId: string
    receiptNumber: string
    pdfUrl?: string | null
    createdAt?: Date | string
  }

  export type ReceiptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiptNumber?: StringFieldUpdateOperationsInput | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
    receiptNumber?: StringFieldUpdateOperationsInput | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityCreateInput = {
    id?: string
    title: string
    beneficiary: string
    purpose?: string | null
    amountPaise: number
    date: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCharitiesCreatedInput
  }

  export type CharityUncheckedCreateInput = {
    id?: string
    title: string
    beneficiary: string
    purpose?: string | null
    amountPaise: number
    date: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CharityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    beneficiary?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    amountPaise?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCharitiesCreatedNestedInput
  }

  export type CharityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    beneficiary?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    amountPaise?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityCreateManyInput = {
    id?: string
    title: string
    beneficiary: string
    purpose?: string | null
    amountPaise: number
    date: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CharityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    beneficiary?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    amountPaise?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    beneficiary?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    amountPaise?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanCreateInput = {
    id?: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutLoansInput
    createdBy: UserCreateNestedOneWithoutLoansCreatedInput
    approvedBy?: UserCreateNestedOneWithoutLoansApprovedInput
    installments?: LoanInstallmentCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateInput = {
    id?: string
    memberId: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById: string
    approvedById?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: LoanInstallmentUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutLoansNestedInput
    createdBy?: UserUpdateOneRequiredWithoutLoansCreatedNestedInput
    approvedBy?: UserUpdateOneWithoutLoansApprovedNestedInput
    installments?: LoanInstallmentUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById?: StringFieldUpdateOperationsInput | string
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: LoanInstallmentUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanCreateManyInput = {
    id?: string
    memberId: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById: string
    approvedById?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById?: StringFieldUpdateOperationsInput | string
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanInstallmentCreateInput = {
    id?: string
    installmentNumber: number
    dueDate: Date | string
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise?: number
    paidAt?: Date | string | null
    overdueInterestPaise?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    loan: LoanCreateNestedOneWithoutInstallmentsInput
    recordedBy?: UserCreateNestedOneWithoutInstallmentsRecordedInput
  }

  export type LoanInstallmentUncheckedCreateInput = {
    id?: string
    loanId: string
    installmentNumber: number
    dueDate: Date | string
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise?: number
    paidAt?: Date | string | null
    overdueInterestPaise?: number
    recordedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanInstallmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestDuePaise?: IntFieldUpdateOperationsInput | number
    principalDuePaise?: IntFieldUpdateOperationsInput | number
    amountPaidPaise?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    overdueInterestPaise?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loan?: LoanUpdateOneRequiredWithoutInstallmentsNestedInput
    recordedBy?: UserUpdateOneWithoutInstallmentsRecordedNestedInput
  }

  export type LoanInstallmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestDuePaise?: IntFieldUpdateOperationsInput | number
    principalDuePaise?: IntFieldUpdateOperationsInput | number
    amountPaidPaise?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    overdueInterestPaise?: IntFieldUpdateOperationsInput | number
    recordedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanInstallmentCreateManyInput = {
    id?: string
    loanId: string
    installmentNumber: number
    dueDate: Date | string
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise?: number
    paidAt?: Date | string | null
    overdueInterestPaise?: number
    recordedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanInstallmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestDuePaise?: IntFieldUpdateOperationsInput | number
    principalDuePaise?: IntFieldUpdateOperationsInput | number
    amountPaidPaise?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    overdueInterestPaise?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanInstallmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestDuePaise?: IntFieldUpdateOperationsInput | number
    principalDuePaise?: IntFieldUpdateOperationsInput | number
    amountPaidPaise?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    overdueInterestPaise?: IntFieldUpdateOperationsInput | number
    recordedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
    admin: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    adminId: string
    action: string
    entity: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    adminId: string
    action: string
    entity: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateInput = {
    key: string
    value: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type SettingUncheckedCreateInput = {
    key: string
    value: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type SettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateManyInput = {
    key: string
    value: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type SettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ContributionRuleListRelationFilter = {
    every?: ContributionRuleWhereInput
    some?: ContributionRuleWhereInput
    none?: ContributionRuleWhereInput
  }

  export type PenaltyRuleListRelationFilter = {
    every?: PenaltyRuleWhereInput
    some?: PenaltyRuleWhereInput
    none?: PenaltyRuleWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type CharityListRelationFilter = {
    every?: CharityWhereInput
    some?: CharityWhereInput
    none?: CharityWhereInput
  }

  export type LoanListRelationFilter = {
    every?: LoanWhereInput
    some?: LoanWhereInput
    none?: LoanWhereInput
  }

  export type LoanInstallmentListRelationFilter = {
    every?: LoanInstallmentWhereInput
    some?: LoanInstallmentWhereInput
    none?: LoanInstallmentWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ContributionRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PenaltyRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CharityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoanInstallmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusFilter<$PrismaModel> | $Enums.MemberStatus
  }

  export type MemberCountOrderByAggregateInput = {
    id?: SortOrder
    memberUid?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    joinDate?: SortOrder
    exitDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberMaxOrderByAggregateInput = {
    id?: SortOrder
    memberUid?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    joinDate?: SortOrder
    exitDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberMinOrderByAggregateInput = {
    id?: SortOrder
    memberUid?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    joinDate?: SortOrder
    exitDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.MemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumMemberStatusFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ContributionRuleEffectiveFromMonthEffectiveFromYearCompoundUniqueInput = {
    effectiveFromMonth: number
    effectiveFromYear: number
  }

  export type ContributionRuleCountOrderByAggregateInput = {
    id?: SortOrder
    amountPaise?: SortOrder
    effectiveFromMonth?: SortOrder
    effectiveFromYear?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type ContributionRuleAvgOrderByAggregateInput = {
    amountPaise?: SortOrder
    effectiveFromMonth?: SortOrder
    effectiveFromYear?: SortOrder
  }

  export type ContributionRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    amountPaise?: SortOrder
    effectiveFromMonth?: SortOrder
    effectiveFromYear?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type ContributionRuleMinOrderByAggregateInput = {
    id?: SortOrder
    amountPaise?: SortOrder
    effectiveFromMonth?: SortOrder
    effectiveFromYear?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type ContributionRuleSumOrderByAggregateInput = {
    amountPaise?: SortOrder
    effectiveFromMonth?: SortOrder
    effectiveFromYear?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type PenaltyRuleCountOrderByAggregateInput = {
    id?: SortOrder
    amountPaise?: SortOrder
    effectiveFrom?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type PenaltyRuleAvgOrderByAggregateInput = {
    amountPaise?: SortOrder
  }

  export type PenaltyRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    amountPaise?: SortOrder
    effectiveFrom?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type PenaltyRuleMinOrderByAggregateInput = {
    id?: SortOrder
    amountPaise?: SortOrder
    effectiveFrom?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type PenaltyRuleSumOrderByAggregateInput = {
    amountPaise?: SortOrder
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type EnumPaymentMethodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodNullableFilter<$PrismaModel> | $Enums.PaymentMethod | null
  }

  export type MemberScalarRelationFilter = {
    is?: MemberWhereInput
    isNot?: MemberWhereInput
  }

  export type ReceiptNullableScalarRelationFilter = {
    is?: ReceiptWhereInput | null
    isNot?: ReceiptWhereInput | null
  }

  export type PaymentMemberIdMonthYearCompoundUniqueInput = {
    memberId: string
    month: number
    year: number
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    month?: SortOrder
    year?: SortOrder
    baseAmountPaise?: SortOrder
    penaltyAmountPaise?: SortOrder
    totalAmountPaise?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    recordedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    month?: SortOrder
    year?: SortOrder
    baseAmountPaise?: SortOrder
    penaltyAmountPaise?: SortOrder
    totalAmountPaise?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    month?: SortOrder
    year?: SortOrder
    baseAmountPaise?: SortOrder
    penaltyAmountPaise?: SortOrder
    totalAmountPaise?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    recordedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    month?: SortOrder
    year?: SortOrder
    baseAmountPaise?: SortOrder
    penaltyAmountPaise?: SortOrder
    totalAmountPaise?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    recordedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    month?: SortOrder
    year?: SortOrder
    baseAmountPaise?: SortOrder
    penaltyAmountPaise?: SortOrder
    totalAmountPaise?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumPaymentMethodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodNullableWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodNullableFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodNullableFilter<$PrismaModel>
  }

  export type PaymentScalarRelationFilter = {
    is?: PaymentWhereInput
    isNot?: PaymentWhereInput
  }

  export type ReceiptCountOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    receiptNumber?: SortOrder
    pdfUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ReceiptMaxOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    receiptNumber?: SortOrder
    pdfUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type ReceiptMinOrderByAggregateInput = {
    id?: SortOrder
    paymentId?: SortOrder
    receiptNumber?: SortOrder
    pdfUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type CharityCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    beneficiary?: SortOrder
    purpose?: SortOrder
    amountPaise?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    imageUrl?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CharityAvgOrderByAggregateInput = {
    amountPaise?: SortOrder
  }

  export type CharityMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    beneficiary?: SortOrder
    purpose?: SortOrder
    amountPaise?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    imageUrl?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CharityMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    beneficiary?: SortOrder
    purpose?: SortOrder
    amountPaise?: SortOrder
    date?: SortOrder
    notes?: SortOrder
    imageUrl?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CharitySumOrderByAggregateInput = {
    amountPaise?: SortOrder
  }

  export type EnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type LoanCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    principalPaise?: SortOrder
    monthlyRateBps?: SortOrder
    durationMonths?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    termsJson?: SortOrder
    createdById?: SortOrder
    approvedById?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanAvgOrderByAggregateInput = {
    principalPaise?: SortOrder
    monthlyRateBps?: SortOrder
    durationMonths?: SortOrder
  }

  export type LoanMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    principalPaise?: SortOrder
    monthlyRateBps?: SortOrder
    durationMonths?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    approvedById?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    principalPaise?: SortOrder
    monthlyRateBps?: SortOrder
    durationMonths?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    createdById?: SortOrder
    approvedById?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanSumOrderByAggregateInput = {
    principalPaise?: SortOrder
    monthlyRateBps?: SortOrder
    durationMonths?: SortOrder
  }

  export type EnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type LoanScalarRelationFilter = {
    is?: LoanWhereInput
    isNot?: LoanWhereInput
  }

  export type LoanInstallmentLoanIdInstallmentNumberCompoundUniqueInput = {
    loanId: string
    installmentNumber: number
  }

  export type LoanInstallmentCountOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNumber?: SortOrder
    dueDate?: SortOrder
    interestDuePaise?: SortOrder
    principalDuePaise?: SortOrder
    amountPaidPaise?: SortOrder
    paidAt?: SortOrder
    overdueInterestPaise?: SortOrder
    recordedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanInstallmentAvgOrderByAggregateInput = {
    installmentNumber?: SortOrder
    interestDuePaise?: SortOrder
    principalDuePaise?: SortOrder
    amountPaidPaise?: SortOrder
    overdueInterestPaise?: SortOrder
  }

  export type LoanInstallmentMaxOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNumber?: SortOrder
    dueDate?: SortOrder
    interestDuePaise?: SortOrder
    principalDuePaise?: SortOrder
    amountPaidPaise?: SortOrder
    paidAt?: SortOrder
    overdueInterestPaise?: SortOrder
    recordedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanInstallmentMinOrderByAggregateInput = {
    id?: SortOrder
    loanId?: SortOrder
    installmentNumber?: SortOrder
    dueDate?: SortOrder
    interestDuePaise?: SortOrder
    principalDuePaise?: SortOrder
    amountPaidPaise?: SortOrder
    paidAt?: SortOrder
    overdueInterestPaise?: SortOrder
    recordedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LoanInstallmentSumOrderByAggregateInput = {
    installmentNumber?: SortOrder
    interestDuePaise?: SortOrder
    principalDuePaise?: SortOrder
    amountPaidPaise?: SortOrder
    overdueInterestPaise?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMaxOrderByAggregateInput = {
    key?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMinOrderByAggregateInput = {
    key?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type ContributionRuleCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ContributionRuleCreateWithoutCreatedByInput, ContributionRuleUncheckedCreateWithoutCreatedByInput> | ContributionRuleCreateWithoutCreatedByInput[] | ContributionRuleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ContributionRuleCreateOrConnectWithoutCreatedByInput | ContributionRuleCreateOrConnectWithoutCreatedByInput[]
    createMany?: ContributionRuleCreateManyCreatedByInputEnvelope
    connect?: ContributionRuleWhereUniqueInput | ContributionRuleWhereUniqueInput[]
  }

  export type PenaltyRuleCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<PenaltyRuleCreateWithoutCreatedByInput, PenaltyRuleUncheckedCreateWithoutCreatedByInput> | PenaltyRuleCreateWithoutCreatedByInput[] | PenaltyRuleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PenaltyRuleCreateOrConnectWithoutCreatedByInput | PenaltyRuleCreateOrConnectWithoutCreatedByInput[]
    createMany?: PenaltyRuleCreateManyCreatedByInputEnvelope
    connect?: PenaltyRuleWhereUniqueInput | PenaltyRuleWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutRecordedByInput = {
    create?: XOR<PaymentCreateWithoutRecordedByInput, PaymentUncheckedCreateWithoutRecordedByInput> | PaymentCreateWithoutRecordedByInput[] | PaymentUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutRecordedByInput | PaymentCreateOrConnectWithoutRecordedByInput[]
    createMany?: PaymentCreateManyRecordedByInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type CharityCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CharityCreateWithoutCreatedByInput, CharityUncheckedCreateWithoutCreatedByInput> | CharityCreateWithoutCreatedByInput[] | CharityUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CharityCreateOrConnectWithoutCreatedByInput | CharityCreateOrConnectWithoutCreatedByInput[]
    createMany?: CharityCreateManyCreatedByInputEnvelope
    connect?: CharityWhereUniqueInput | CharityWhereUniqueInput[]
  }

  export type LoanCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<LoanCreateWithoutCreatedByInput, LoanUncheckedCreateWithoutCreatedByInput> | LoanCreateWithoutCreatedByInput[] | LoanUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutCreatedByInput | LoanCreateOrConnectWithoutCreatedByInput[]
    createMany?: LoanCreateManyCreatedByInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type LoanCreateNestedManyWithoutApprovedByInput = {
    create?: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput> | LoanCreateWithoutApprovedByInput[] | LoanUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutApprovedByInput | LoanCreateOrConnectWithoutApprovedByInput[]
    createMany?: LoanCreateManyApprovedByInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type LoanInstallmentCreateNestedManyWithoutRecordedByInput = {
    create?: XOR<LoanInstallmentCreateWithoutRecordedByInput, LoanInstallmentUncheckedCreateWithoutRecordedByInput> | LoanInstallmentCreateWithoutRecordedByInput[] | LoanInstallmentUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: LoanInstallmentCreateOrConnectWithoutRecordedByInput | LoanInstallmentCreateOrConnectWithoutRecordedByInput[]
    createMany?: LoanInstallmentCreateManyRecordedByInputEnvelope
    connect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutAdminInput = {
    create?: XOR<AuditLogCreateWithoutAdminInput, AuditLogUncheckedCreateWithoutAdminInput> | AuditLogCreateWithoutAdminInput[] | AuditLogUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutAdminInput | AuditLogCreateOrConnectWithoutAdminInput[]
    createMany?: AuditLogCreateManyAdminInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ContributionRuleUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ContributionRuleCreateWithoutCreatedByInput, ContributionRuleUncheckedCreateWithoutCreatedByInput> | ContributionRuleCreateWithoutCreatedByInput[] | ContributionRuleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ContributionRuleCreateOrConnectWithoutCreatedByInput | ContributionRuleCreateOrConnectWithoutCreatedByInput[]
    createMany?: ContributionRuleCreateManyCreatedByInputEnvelope
    connect?: ContributionRuleWhereUniqueInput | ContributionRuleWhereUniqueInput[]
  }

  export type PenaltyRuleUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<PenaltyRuleCreateWithoutCreatedByInput, PenaltyRuleUncheckedCreateWithoutCreatedByInput> | PenaltyRuleCreateWithoutCreatedByInput[] | PenaltyRuleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PenaltyRuleCreateOrConnectWithoutCreatedByInput | PenaltyRuleCreateOrConnectWithoutCreatedByInput[]
    createMany?: PenaltyRuleCreateManyCreatedByInputEnvelope
    connect?: PenaltyRuleWhereUniqueInput | PenaltyRuleWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutRecordedByInput = {
    create?: XOR<PaymentCreateWithoutRecordedByInput, PaymentUncheckedCreateWithoutRecordedByInput> | PaymentCreateWithoutRecordedByInput[] | PaymentUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutRecordedByInput | PaymentCreateOrConnectWithoutRecordedByInput[]
    createMany?: PaymentCreateManyRecordedByInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type CharityUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CharityCreateWithoutCreatedByInput, CharityUncheckedCreateWithoutCreatedByInput> | CharityCreateWithoutCreatedByInput[] | CharityUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CharityCreateOrConnectWithoutCreatedByInput | CharityCreateOrConnectWithoutCreatedByInput[]
    createMany?: CharityCreateManyCreatedByInputEnvelope
    connect?: CharityWhereUniqueInput | CharityWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<LoanCreateWithoutCreatedByInput, LoanUncheckedCreateWithoutCreatedByInput> | LoanCreateWithoutCreatedByInput[] | LoanUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutCreatedByInput | LoanCreateOrConnectWithoutCreatedByInput[]
    createMany?: LoanCreateManyCreatedByInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutApprovedByInput = {
    create?: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput> | LoanCreateWithoutApprovedByInput[] | LoanUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutApprovedByInput | LoanCreateOrConnectWithoutApprovedByInput[]
    createMany?: LoanCreateManyApprovedByInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type LoanInstallmentUncheckedCreateNestedManyWithoutRecordedByInput = {
    create?: XOR<LoanInstallmentCreateWithoutRecordedByInput, LoanInstallmentUncheckedCreateWithoutRecordedByInput> | LoanInstallmentCreateWithoutRecordedByInput[] | LoanInstallmentUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: LoanInstallmentCreateOrConnectWithoutRecordedByInput | LoanInstallmentCreateOrConnectWithoutRecordedByInput[]
    createMany?: LoanInstallmentCreateManyRecordedByInputEnvelope
    connect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<AuditLogCreateWithoutAdminInput, AuditLogUncheckedCreateWithoutAdminInput> | AuditLogCreateWithoutAdminInput[] | AuditLogUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutAdminInput | AuditLogCreateOrConnectWithoutAdminInput[]
    createMany?: AuditLogCreateManyAdminInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ContributionRuleUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ContributionRuleCreateWithoutCreatedByInput, ContributionRuleUncheckedCreateWithoutCreatedByInput> | ContributionRuleCreateWithoutCreatedByInput[] | ContributionRuleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ContributionRuleCreateOrConnectWithoutCreatedByInput | ContributionRuleCreateOrConnectWithoutCreatedByInput[]
    upsert?: ContributionRuleUpsertWithWhereUniqueWithoutCreatedByInput | ContributionRuleUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ContributionRuleCreateManyCreatedByInputEnvelope
    set?: ContributionRuleWhereUniqueInput | ContributionRuleWhereUniqueInput[]
    disconnect?: ContributionRuleWhereUniqueInput | ContributionRuleWhereUniqueInput[]
    delete?: ContributionRuleWhereUniqueInput | ContributionRuleWhereUniqueInput[]
    connect?: ContributionRuleWhereUniqueInput | ContributionRuleWhereUniqueInput[]
    update?: ContributionRuleUpdateWithWhereUniqueWithoutCreatedByInput | ContributionRuleUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ContributionRuleUpdateManyWithWhereWithoutCreatedByInput | ContributionRuleUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ContributionRuleScalarWhereInput | ContributionRuleScalarWhereInput[]
  }

  export type PenaltyRuleUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<PenaltyRuleCreateWithoutCreatedByInput, PenaltyRuleUncheckedCreateWithoutCreatedByInput> | PenaltyRuleCreateWithoutCreatedByInput[] | PenaltyRuleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PenaltyRuleCreateOrConnectWithoutCreatedByInput | PenaltyRuleCreateOrConnectWithoutCreatedByInput[]
    upsert?: PenaltyRuleUpsertWithWhereUniqueWithoutCreatedByInput | PenaltyRuleUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: PenaltyRuleCreateManyCreatedByInputEnvelope
    set?: PenaltyRuleWhereUniqueInput | PenaltyRuleWhereUniqueInput[]
    disconnect?: PenaltyRuleWhereUniqueInput | PenaltyRuleWhereUniqueInput[]
    delete?: PenaltyRuleWhereUniqueInput | PenaltyRuleWhereUniqueInput[]
    connect?: PenaltyRuleWhereUniqueInput | PenaltyRuleWhereUniqueInput[]
    update?: PenaltyRuleUpdateWithWhereUniqueWithoutCreatedByInput | PenaltyRuleUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: PenaltyRuleUpdateManyWithWhereWithoutCreatedByInput | PenaltyRuleUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: PenaltyRuleScalarWhereInput | PenaltyRuleScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutRecordedByNestedInput = {
    create?: XOR<PaymentCreateWithoutRecordedByInput, PaymentUncheckedCreateWithoutRecordedByInput> | PaymentCreateWithoutRecordedByInput[] | PaymentUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutRecordedByInput | PaymentCreateOrConnectWithoutRecordedByInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutRecordedByInput | PaymentUpsertWithWhereUniqueWithoutRecordedByInput[]
    createMany?: PaymentCreateManyRecordedByInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutRecordedByInput | PaymentUpdateWithWhereUniqueWithoutRecordedByInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutRecordedByInput | PaymentUpdateManyWithWhereWithoutRecordedByInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type CharityUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CharityCreateWithoutCreatedByInput, CharityUncheckedCreateWithoutCreatedByInput> | CharityCreateWithoutCreatedByInput[] | CharityUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CharityCreateOrConnectWithoutCreatedByInput | CharityCreateOrConnectWithoutCreatedByInput[]
    upsert?: CharityUpsertWithWhereUniqueWithoutCreatedByInput | CharityUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CharityCreateManyCreatedByInputEnvelope
    set?: CharityWhereUniqueInput | CharityWhereUniqueInput[]
    disconnect?: CharityWhereUniqueInput | CharityWhereUniqueInput[]
    delete?: CharityWhereUniqueInput | CharityWhereUniqueInput[]
    connect?: CharityWhereUniqueInput | CharityWhereUniqueInput[]
    update?: CharityUpdateWithWhereUniqueWithoutCreatedByInput | CharityUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CharityUpdateManyWithWhereWithoutCreatedByInput | CharityUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CharityScalarWhereInput | CharityScalarWhereInput[]
  }

  export type LoanUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<LoanCreateWithoutCreatedByInput, LoanUncheckedCreateWithoutCreatedByInput> | LoanCreateWithoutCreatedByInput[] | LoanUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutCreatedByInput | LoanCreateOrConnectWithoutCreatedByInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutCreatedByInput | LoanUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: LoanCreateManyCreatedByInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutCreatedByInput | LoanUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutCreatedByInput | LoanUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type LoanUpdateManyWithoutApprovedByNestedInput = {
    create?: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput> | LoanCreateWithoutApprovedByInput[] | LoanUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutApprovedByInput | LoanCreateOrConnectWithoutApprovedByInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutApprovedByInput | LoanUpsertWithWhereUniqueWithoutApprovedByInput[]
    createMany?: LoanCreateManyApprovedByInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutApprovedByInput | LoanUpdateWithWhereUniqueWithoutApprovedByInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutApprovedByInput | LoanUpdateManyWithWhereWithoutApprovedByInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type LoanInstallmentUpdateManyWithoutRecordedByNestedInput = {
    create?: XOR<LoanInstallmentCreateWithoutRecordedByInput, LoanInstallmentUncheckedCreateWithoutRecordedByInput> | LoanInstallmentCreateWithoutRecordedByInput[] | LoanInstallmentUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: LoanInstallmentCreateOrConnectWithoutRecordedByInput | LoanInstallmentCreateOrConnectWithoutRecordedByInput[]
    upsert?: LoanInstallmentUpsertWithWhereUniqueWithoutRecordedByInput | LoanInstallmentUpsertWithWhereUniqueWithoutRecordedByInput[]
    createMany?: LoanInstallmentCreateManyRecordedByInputEnvelope
    set?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    disconnect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    delete?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    connect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    update?: LoanInstallmentUpdateWithWhereUniqueWithoutRecordedByInput | LoanInstallmentUpdateWithWhereUniqueWithoutRecordedByInput[]
    updateMany?: LoanInstallmentUpdateManyWithWhereWithoutRecordedByInput | LoanInstallmentUpdateManyWithWhereWithoutRecordedByInput[]
    deleteMany?: LoanInstallmentScalarWhereInput | LoanInstallmentScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutAdminNestedInput = {
    create?: XOR<AuditLogCreateWithoutAdminInput, AuditLogUncheckedCreateWithoutAdminInput> | AuditLogCreateWithoutAdminInput[] | AuditLogUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutAdminInput | AuditLogCreateOrConnectWithoutAdminInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutAdminInput | AuditLogUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: AuditLogCreateManyAdminInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutAdminInput | AuditLogUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutAdminInput | AuditLogUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ContributionRuleUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ContributionRuleCreateWithoutCreatedByInput, ContributionRuleUncheckedCreateWithoutCreatedByInput> | ContributionRuleCreateWithoutCreatedByInput[] | ContributionRuleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ContributionRuleCreateOrConnectWithoutCreatedByInput | ContributionRuleCreateOrConnectWithoutCreatedByInput[]
    upsert?: ContributionRuleUpsertWithWhereUniqueWithoutCreatedByInput | ContributionRuleUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ContributionRuleCreateManyCreatedByInputEnvelope
    set?: ContributionRuleWhereUniqueInput | ContributionRuleWhereUniqueInput[]
    disconnect?: ContributionRuleWhereUniqueInput | ContributionRuleWhereUniqueInput[]
    delete?: ContributionRuleWhereUniqueInput | ContributionRuleWhereUniqueInput[]
    connect?: ContributionRuleWhereUniqueInput | ContributionRuleWhereUniqueInput[]
    update?: ContributionRuleUpdateWithWhereUniqueWithoutCreatedByInput | ContributionRuleUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ContributionRuleUpdateManyWithWhereWithoutCreatedByInput | ContributionRuleUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ContributionRuleScalarWhereInput | ContributionRuleScalarWhereInput[]
  }

  export type PenaltyRuleUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<PenaltyRuleCreateWithoutCreatedByInput, PenaltyRuleUncheckedCreateWithoutCreatedByInput> | PenaltyRuleCreateWithoutCreatedByInput[] | PenaltyRuleUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PenaltyRuleCreateOrConnectWithoutCreatedByInput | PenaltyRuleCreateOrConnectWithoutCreatedByInput[]
    upsert?: PenaltyRuleUpsertWithWhereUniqueWithoutCreatedByInput | PenaltyRuleUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: PenaltyRuleCreateManyCreatedByInputEnvelope
    set?: PenaltyRuleWhereUniqueInput | PenaltyRuleWhereUniqueInput[]
    disconnect?: PenaltyRuleWhereUniqueInput | PenaltyRuleWhereUniqueInput[]
    delete?: PenaltyRuleWhereUniqueInput | PenaltyRuleWhereUniqueInput[]
    connect?: PenaltyRuleWhereUniqueInput | PenaltyRuleWhereUniqueInput[]
    update?: PenaltyRuleUpdateWithWhereUniqueWithoutCreatedByInput | PenaltyRuleUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: PenaltyRuleUpdateManyWithWhereWithoutCreatedByInput | PenaltyRuleUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: PenaltyRuleScalarWhereInput | PenaltyRuleScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutRecordedByNestedInput = {
    create?: XOR<PaymentCreateWithoutRecordedByInput, PaymentUncheckedCreateWithoutRecordedByInput> | PaymentCreateWithoutRecordedByInput[] | PaymentUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutRecordedByInput | PaymentCreateOrConnectWithoutRecordedByInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutRecordedByInput | PaymentUpsertWithWhereUniqueWithoutRecordedByInput[]
    createMany?: PaymentCreateManyRecordedByInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutRecordedByInput | PaymentUpdateWithWhereUniqueWithoutRecordedByInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutRecordedByInput | PaymentUpdateManyWithWhereWithoutRecordedByInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type CharityUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CharityCreateWithoutCreatedByInput, CharityUncheckedCreateWithoutCreatedByInput> | CharityCreateWithoutCreatedByInput[] | CharityUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CharityCreateOrConnectWithoutCreatedByInput | CharityCreateOrConnectWithoutCreatedByInput[]
    upsert?: CharityUpsertWithWhereUniqueWithoutCreatedByInput | CharityUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CharityCreateManyCreatedByInputEnvelope
    set?: CharityWhereUniqueInput | CharityWhereUniqueInput[]
    disconnect?: CharityWhereUniqueInput | CharityWhereUniqueInput[]
    delete?: CharityWhereUniqueInput | CharityWhereUniqueInput[]
    connect?: CharityWhereUniqueInput | CharityWhereUniqueInput[]
    update?: CharityUpdateWithWhereUniqueWithoutCreatedByInput | CharityUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CharityUpdateManyWithWhereWithoutCreatedByInput | CharityUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CharityScalarWhereInput | CharityScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<LoanCreateWithoutCreatedByInput, LoanUncheckedCreateWithoutCreatedByInput> | LoanCreateWithoutCreatedByInput[] | LoanUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutCreatedByInput | LoanCreateOrConnectWithoutCreatedByInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutCreatedByInput | LoanUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: LoanCreateManyCreatedByInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutCreatedByInput | LoanUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutCreatedByInput | LoanUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutApprovedByNestedInput = {
    create?: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput> | LoanCreateWithoutApprovedByInput[] | LoanUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutApprovedByInput | LoanCreateOrConnectWithoutApprovedByInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutApprovedByInput | LoanUpsertWithWhereUniqueWithoutApprovedByInput[]
    createMany?: LoanCreateManyApprovedByInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutApprovedByInput | LoanUpdateWithWhereUniqueWithoutApprovedByInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutApprovedByInput | LoanUpdateManyWithWhereWithoutApprovedByInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type LoanInstallmentUncheckedUpdateManyWithoutRecordedByNestedInput = {
    create?: XOR<LoanInstallmentCreateWithoutRecordedByInput, LoanInstallmentUncheckedCreateWithoutRecordedByInput> | LoanInstallmentCreateWithoutRecordedByInput[] | LoanInstallmentUncheckedCreateWithoutRecordedByInput[]
    connectOrCreate?: LoanInstallmentCreateOrConnectWithoutRecordedByInput | LoanInstallmentCreateOrConnectWithoutRecordedByInput[]
    upsert?: LoanInstallmentUpsertWithWhereUniqueWithoutRecordedByInput | LoanInstallmentUpsertWithWhereUniqueWithoutRecordedByInput[]
    createMany?: LoanInstallmentCreateManyRecordedByInputEnvelope
    set?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    disconnect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    delete?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    connect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    update?: LoanInstallmentUpdateWithWhereUniqueWithoutRecordedByInput | LoanInstallmentUpdateWithWhereUniqueWithoutRecordedByInput[]
    updateMany?: LoanInstallmentUpdateManyWithWhereWithoutRecordedByInput | LoanInstallmentUpdateManyWithWhereWithoutRecordedByInput[]
    deleteMany?: LoanInstallmentScalarWhereInput | LoanInstallmentScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<AuditLogCreateWithoutAdminInput, AuditLogUncheckedCreateWithoutAdminInput> | AuditLogCreateWithoutAdminInput[] | AuditLogUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutAdminInput | AuditLogCreateOrConnectWithoutAdminInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutAdminInput | AuditLogUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: AuditLogCreateManyAdminInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutAdminInput | AuditLogUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutAdminInput | AuditLogUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type PaymentCreateNestedManyWithoutMemberInput = {
    create?: XOR<PaymentCreateWithoutMemberInput, PaymentUncheckedCreateWithoutMemberInput> | PaymentCreateWithoutMemberInput[] | PaymentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutMemberInput | PaymentCreateOrConnectWithoutMemberInput[]
    createMany?: PaymentCreateManyMemberInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type LoanCreateNestedManyWithoutMemberInput = {
    create?: XOR<LoanCreateWithoutMemberInput, LoanUncheckedCreateWithoutMemberInput> | LoanCreateWithoutMemberInput[] | LoanUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutMemberInput | LoanCreateOrConnectWithoutMemberInput[]
    createMany?: LoanCreateManyMemberInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<PaymentCreateWithoutMemberInput, PaymentUncheckedCreateWithoutMemberInput> | PaymentCreateWithoutMemberInput[] | PaymentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutMemberInput | PaymentCreateOrConnectWithoutMemberInput[]
    createMany?: PaymentCreateManyMemberInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<LoanCreateWithoutMemberInput, LoanUncheckedCreateWithoutMemberInput> | LoanCreateWithoutMemberInput[] | LoanUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutMemberInput | LoanCreateOrConnectWithoutMemberInput[]
    createMany?: LoanCreateManyMemberInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumMemberStatusFieldUpdateOperationsInput = {
    set?: $Enums.MemberStatus
  }

  export type PaymentUpdateManyWithoutMemberNestedInput = {
    create?: XOR<PaymentCreateWithoutMemberInput, PaymentUncheckedCreateWithoutMemberInput> | PaymentCreateWithoutMemberInput[] | PaymentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutMemberInput | PaymentCreateOrConnectWithoutMemberInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutMemberInput | PaymentUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: PaymentCreateManyMemberInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutMemberInput | PaymentUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutMemberInput | PaymentUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type LoanUpdateManyWithoutMemberNestedInput = {
    create?: XOR<LoanCreateWithoutMemberInput, LoanUncheckedCreateWithoutMemberInput> | LoanCreateWithoutMemberInput[] | LoanUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutMemberInput | LoanCreateOrConnectWithoutMemberInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutMemberInput | LoanUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: LoanCreateManyMemberInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutMemberInput | LoanUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutMemberInput | LoanUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<PaymentCreateWithoutMemberInput, PaymentUncheckedCreateWithoutMemberInput> | PaymentCreateWithoutMemberInput[] | PaymentUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutMemberInput | PaymentCreateOrConnectWithoutMemberInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutMemberInput | PaymentUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: PaymentCreateManyMemberInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutMemberInput | PaymentUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutMemberInput | PaymentUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<LoanCreateWithoutMemberInput, LoanUncheckedCreateWithoutMemberInput> | LoanCreateWithoutMemberInput[] | LoanUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutMemberInput | LoanCreateOrConnectWithoutMemberInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutMemberInput | LoanUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: LoanCreateManyMemberInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutMemberInput | LoanUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutMemberInput | LoanUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutContributionRulesCreatedInput = {
    create?: XOR<UserCreateWithoutContributionRulesCreatedInput, UserUncheckedCreateWithoutContributionRulesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutContributionRulesCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutContributionRulesCreatedNestedInput = {
    create?: XOR<UserCreateWithoutContributionRulesCreatedInput, UserUncheckedCreateWithoutContributionRulesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutContributionRulesCreatedInput
    upsert?: UserUpsertWithoutContributionRulesCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutContributionRulesCreatedInput, UserUpdateWithoutContributionRulesCreatedInput>, UserUncheckedUpdateWithoutContributionRulesCreatedInput>
  }

  export type UserCreateNestedOneWithoutPenaltyRulesCreatedInput = {
    create?: XOR<UserCreateWithoutPenaltyRulesCreatedInput, UserUncheckedCreateWithoutPenaltyRulesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPenaltyRulesCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPenaltyRulesCreatedNestedInput = {
    create?: XOR<UserCreateWithoutPenaltyRulesCreatedInput, UserUncheckedCreateWithoutPenaltyRulesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPenaltyRulesCreatedInput
    upsert?: UserUpsertWithoutPenaltyRulesCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPenaltyRulesCreatedInput, UserUpdateWithoutPenaltyRulesCreatedInput>, UserUncheckedUpdateWithoutPenaltyRulesCreatedInput>
  }

  export type MemberCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<MemberCreateWithoutPaymentsInput, MemberUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutPaymentsInput
    connect?: MemberWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPaymentsRecordedInput = {
    create?: XOR<UserCreateWithoutPaymentsRecordedInput, UserUncheckedCreateWithoutPaymentsRecordedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsRecordedInput
    connect?: UserWhereUniqueInput
  }

  export type ReceiptCreateNestedOneWithoutPaymentInput = {
    create?: XOR<ReceiptCreateWithoutPaymentInput, ReceiptUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: ReceiptCreateOrConnectWithoutPaymentInput
    connect?: ReceiptWhereUniqueInput
  }

  export type ReceiptUncheckedCreateNestedOneWithoutPaymentInput = {
    create?: XOR<ReceiptCreateWithoutPaymentInput, ReceiptUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: ReceiptCreateOrConnectWithoutPaymentInput
    connect?: ReceiptWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type NullableEnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod | null
  }

  export type MemberUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<MemberCreateWithoutPaymentsInput, MemberUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutPaymentsInput
    upsert?: MemberUpsertWithoutPaymentsInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutPaymentsInput, MemberUpdateWithoutPaymentsInput>, MemberUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateOneRequiredWithoutPaymentsRecordedNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsRecordedInput, UserUncheckedCreateWithoutPaymentsRecordedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsRecordedInput
    upsert?: UserUpsertWithoutPaymentsRecordedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsRecordedInput, UserUpdateWithoutPaymentsRecordedInput>, UserUncheckedUpdateWithoutPaymentsRecordedInput>
  }

  export type ReceiptUpdateOneWithoutPaymentNestedInput = {
    create?: XOR<ReceiptCreateWithoutPaymentInput, ReceiptUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: ReceiptCreateOrConnectWithoutPaymentInput
    upsert?: ReceiptUpsertWithoutPaymentInput
    disconnect?: ReceiptWhereInput | boolean
    delete?: ReceiptWhereInput | boolean
    connect?: ReceiptWhereUniqueInput
    update?: XOR<XOR<ReceiptUpdateToOneWithWhereWithoutPaymentInput, ReceiptUpdateWithoutPaymentInput>, ReceiptUncheckedUpdateWithoutPaymentInput>
  }

  export type ReceiptUncheckedUpdateOneWithoutPaymentNestedInput = {
    create?: XOR<ReceiptCreateWithoutPaymentInput, ReceiptUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: ReceiptCreateOrConnectWithoutPaymentInput
    upsert?: ReceiptUpsertWithoutPaymentInput
    disconnect?: ReceiptWhereInput | boolean
    delete?: ReceiptWhereInput | boolean
    connect?: ReceiptWhereUniqueInput
    update?: XOR<XOR<ReceiptUpdateToOneWithWhereWithoutPaymentInput, ReceiptUpdateWithoutPaymentInput>, ReceiptUncheckedUpdateWithoutPaymentInput>
  }

  export type PaymentCreateNestedOneWithoutReceiptInput = {
    create?: XOR<PaymentCreateWithoutReceiptInput, PaymentUncheckedCreateWithoutReceiptInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutReceiptInput
    connect?: PaymentWhereUniqueInput
  }

  export type PaymentUpdateOneRequiredWithoutReceiptNestedInput = {
    create?: XOR<PaymentCreateWithoutReceiptInput, PaymentUncheckedCreateWithoutReceiptInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutReceiptInput
    upsert?: PaymentUpsertWithoutReceiptInput
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutReceiptInput, PaymentUpdateWithoutReceiptInput>, PaymentUncheckedUpdateWithoutReceiptInput>
  }

  export type UserCreateNestedOneWithoutCharitiesCreatedInput = {
    create?: XOR<UserCreateWithoutCharitiesCreatedInput, UserUncheckedCreateWithoutCharitiesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCharitiesCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCharitiesCreatedNestedInput = {
    create?: XOR<UserCreateWithoutCharitiesCreatedInput, UserUncheckedCreateWithoutCharitiesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCharitiesCreatedInput
    upsert?: UserUpsertWithoutCharitiesCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCharitiesCreatedInput, UserUpdateWithoutCharitiesCreatedInput>, UserUncheckedUpdateWithoutCharitiesCreatedInput>
  }

  export type MemberCreateNestedOneWithoutLoansInput = {
    create?: XOR<MemberCreateWithoutLoansInput, MemberUncheckedCreateWithoutLoansInput>
    connectOrCreate?: MemberCreateOrConnectWithoutLoansInput
    connect?: MemberWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLoansCreatedInput = {
    create?: XOR<UserCreateWithoutLoansCreatedInput, UserUncheckedCreateWithoutLoansCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoansCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLoansApprovedInput = {
    create?: XOR<UserCreateWithoutLoansApprovedInput, UserUncheckedCreateWithoutLoansApprovedInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoansApprovedInput
    connect?: UserWhereUniqueInput
  }

  export type LoanInstallmentCreateNestedManyWithoutLoanInput = {
    create?: XOR<LoanInstallmentCreateWithoutLoanInput, LoanInstallmentUncheckedCreateWithoutLoanInput> | LoanInstallmentCreateWithoutLoanInput[] | LoanInstallmentUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: LoanInstallmentCreateOrConnectWithoutLoanInput | LoanInstallmentCreateOrConnectWithoutLoanInput[]
    createMany?: LoanInstallmentCreateManyLoanInputEnvelope
    connect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
  }

  export type LoanInstallmentUncheckedCreateNestedManyWithoutLoanInput = {
    create?: XOR<LoanInstallmentCreateWithoutLoanInput, LoanInstallmentUncheckedCreateWithoutLoanInput> | LoanInstallmentCreateWithoutLoanInput[] | LoanInstallmentUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: LoanInstallmentCreateOrConnectWithoutLoanInput | LoanInstallmentCreateOrConnectWithoutLoanInput[]
    createMany?: LoanInstallmentCreateManyLoanInputEnvelope
    connect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
  }

  export type EnumLoanStatusFieldUpdateOperationsInput = {
    set?: $Enums.LoanStatus
  }

  export type MemberUpdateOneRequiredWithoutLoansNestedInput = {
    create?: XOR<MemberCreateWithoutLoansInput, MemberUncheckedCreateWithoutLoansInput>
    connectOrCreate?: MemberCreateOrConnectWithoutLoansInput
    upsert?: MemberUpsertWithoutLoansInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutLoansInput, MemberUpdateWithoutLoansInput>, MemberUncheckedUpdateWithoutLoansInput>
  }

  export type UserUpdateOneRequiredWithoutLoansCreatedNestedInput = {
    create?: XOR<UserCreateWithoutLoansCreatedInput, UserUncheckedCreateWithoutLoansCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoansCreatedInput
    upsert?: UserUpsertWithoutLoansCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLoansCreatedInput, UserUpdateWithoutLoansCreatedInput>, UserUncheckedUpdateWithoutLoansCreatedInput>
  }

  export type UserUpdateOneWithoutLoansApprovedNestedInput = {
    create?: XOR<UserCreateWithoutLoansApprovedInput, UserUncheckedCreateWithoutLoansApprovedInput>
    connectOrCreate?: UserCreateOrConnectWithoutLoansApprovedInput
    upsert?: UserUpsertWithoutLoansApprovedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLoansApprovedInput, UserUpdateWithoutLoansApprovedInput>, UserUncheckedUpdateWithoutLoansApprovedInput>
  }

  export type LoanInstallmentUpdateManyWithoutLoanNestedInput = {
    create?: XOR<LoanInstallmentCreateWithoutLoanInput, LoanInstallmentUncheckedCreateWithoutLoanInput> | LoanInstallmentCreateWithoutLoanInput[] | LoanInstallmentUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: LoanInstallmentCreateOrConnectWithoutLoanInput | LoanInstallmentCreateOrConnectWithoutLoanInput[]
    upsert?: LoanInstallmentUpsertWithWhereUniqueWithoutLoanInput | LoanInstallmentUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: LoanInstallmentCreateManyLoanInputEnvelope
    set?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    disconnect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    delete?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    connect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    update?: LoanInstallmentUpdateWithWhereUniqueWithoutLoanInput | LoanInstallmentUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: LoanInstallmentUpdateManyWithWhereWithoutLoanInput | LoanInstallmentUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: LoanInstallmentScalarWhereInput | LoanInstallmentScalarWhereInput[]
  }

  export type LoanInstallmentUncheckedUpdateManyWithoutLoanNestedInput = {
    create?: XOR<LoanInstallmentCreateWithoutLoanInput, LoanInstallmentUncheckedCreateWithoutLoanInput> | LoanInstallmentCreateWithoutLoanInput[] | LoanInstallmentUncheckedCreateWithoutLoanInput[]
    connectOrCreate?: LoanInstallmentCreateOrConnectWithoutLoanInput | LoanInstallmentCreateOrConnectWithoutLoanInput[]
    upsert?: LoanInstallmentUpsertWithWhereUniqueWithoutLoanInput | LoanInstallmentUpsertWithWhereUniqueWithoutLoanInput[]
    createMany?: LoanInstallmentCreateManyLoanInputEnvelope
    set?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    disconnect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    delete?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    connect?: LoanInstallmentWhereUniqueInput | LoanInstallmentWhereUniqueInput[]
    update?: LoanInstallmentUpdateWithWhereUniqueWithoutLoanInput | LoanInstallmentUpdateWithWhereUniqueWithoutLoanInput[]
    updateMany?: LoanInstallmentUpdateManyWithWhereWithoutLoanInput | LoanInstallmentUpdateManyWithWhereWithoutLoanInput[]
    deleteMany?: LoanInstallmentScalarWhereInput | LoanInstallmentScalarWhereInput[]
  }

  export type LoanCreateNestedOneWithoutInstallmentsInput = {
    create?: XOR<LoanCreateWithoutInstallmentsInput, LoanUncheckedCreateWithoutInstallmentsInput>
    connectOrCreate?: LoanCreateOrConnectWithoutInstallmentsInput
    connect?: LoanWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInstallmentsRecordedInput = {
    create?: XOR<UserCreateWithoutInstallmentsRecordedInput, UserUncheckedCreateWithoutInstallmentsRecordedInput>
    connectOrCreate?: UserCreateOrConnectWithoutInstallmentsRecordedInput
    connect?: UserWhereUniqueInput
  }

  export type LoanUpdateOneRequiredWithoutInstallmentsNestedInput = {
    create?: XOR<LoanCreateWithoutInstallmentsInput, LoanUncheckedCreateWithoutInstallmentsInput>
    connectOrCreate?: LoanCreateOrConnectWithoutInstallmentsInput
    upsert?: LoanUpsertWithoutInstallmentsInput
    connect?: LoanWhereUniqueInput
    update?: XOR<XOR<LoanUpdateToOneWithWhereWithoutInstallmentsInput, LoanUpdateWithoutInstallmentsInput>, LoanUncheckedUpdateWithoutInstallmentsInput>
  }

  export type UserUpdateOneWithoutInstallmentsRecordedNestedInput = {
    create?: XOR<UserCreateWithoutInstallmentsRecordedInput, UserUncheckedCreateWithoutInstallmentsRecordedInput>
    connectOrCreate?: UserCreateOrConnectWithoutInstallmentsRecordedInput
    upsert?: UserUpsertWithoutInstallmentsRecordedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInstallmentsRecordedInput, UserUpdateWithoutInstallmentsRecordedInput>, UserUncheckedUpdateWithoutInstallmentsRecordedInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusFilter<$PrismaModel> | $Enums.MemberStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.MemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumMemberStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentMethodNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodNullableFilter<$PrismaModel> | $Enums.PaymentMethod | null
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel> | null
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    not?: NestedEnumPaymentMethodNullableWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodNullableFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodNullableFilter<$PrismaModel>
  }

  export type NestedEnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ContributionRuleCreateWithoutCreatedByInput = {
    id?: string
    amountPaise: number
    effectiveFromMonth: number
    effectiveFromYear: number
    createdAt?: Date | string
  }

  export type ContributionRuleUncheckedCreateWithoutCreatedByInput = {
    id?: string
    amountPaise: number
    effectiveFromMonth: number
    effectiveFromYear: number
    createdAt?: Date | string
  }

  export type ContributionRuleCreateOrConnectWithoutCreatedByInput = {
    where: ContributionRuleWhereUniqueInput
    create: XOR<ContributionRuleCreateWithoutCreatedByInput, ContributionRuleUncheckedCreateWithoutCreatedByInput>
  }

  export type ContributionRuleCreateManyCreatedByInputEnvelope = {
    data: ContributionRuleCreateManyCreatedByInput | ContributionRuleCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type PenaltyRuleCreateWithoutCreatedByInput = {
    id?: string
    amountPaise: number
    effectiveFrom: Date | string
    createdAt?: Date | string
  }

  export type PenaltyRuleUncheckedCreateWithoutCreatedByInput = {
    id?: string
    amountPaise: number
    effectiveFrom: Date | string
    createdAt?: Date | string
  }

  export type PenaltyRuleCreateOrConnectWithoutCreatedByInput = {
    where: PenaltyRuleWhereUniqueInput
    create: XOR<PenaltyRuleCreateWithoutCreatedByInput, PenaltyRuleUncheckedCreateWithoutCreatedByInput>
  }

  export type PenaltyRuleCreateManyCreatedByInputEnvelope = {
    data: PenaltyRuleCreateManyCreatedByInput | PenaltyRuleCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutRecordedByInput = {
    id?: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutPaymentsInput
    receipt?: ReceiptCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutRecordedByInput = {
    id?: string
    memberId: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipt?: ReceiptUncheckedCreateNestedOneWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutRecordedByInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutRecordedByInput, PaymentUncheckedCreateWithoutRecordedByInput>
  }

  export type PaymentCreateManyRecordedByInputEnvelope = {
    data: PaymentCreateManyRecordedByInput | PaymentCreateManyRecordedByInput[]
    skipDuplicates?: boolean
  }

  export type CharityCreateWithoutCreatedByInput = {
    id?: string
    title: string
    beneficiary: string
    purpose?: string | null
    amountPaise: number
    date: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CharityUncheckedCreateWithoutCreatedByInput = {
    id?: string
    title: string
    beneficiary: string
    purpose?: string | null
    amountPaise: number
    date: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CharityCreateOrConnectWithoutCreatedByInput = {
    where: CharityWhereUniqueInput
    create: XOR<CharityCreateWithoutCreatedByInput, CharityUncheckedCreateWithoutCreatedByInput>
  }

  export type CharityCreateManyCreatedByInputEnvelope = {
    data: CharityCreateManyCreatedByInput | CharityCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type LoanCreateWithoutCreatedByInput = {
    id?: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutLoansInput
    approvedBy?: UserCreateNestedOneWithoutLoansApprovedInput
    installments?: LoanInstallmentCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateWithoutCreatedByInput = {
    id?: string
    memberId: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedById?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: LoanInstallmentUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutCreatedByInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutCreatedByInput, LoanUncheckedCreateWithoutCreatedByInput>
  }

  export type LoanCreateManyCreatedByInputEnvelope = {
    data: LoanCreateManyCreatedByInput | LoanCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type LoanCreateWithoutApprovedByInput = {
    id?: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutLoansInput
    createdBy: UserCreateNestedOneWithoutLoansCreatedInput
    installments?: LoanInstallmentCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateWithoutApprovedByInput = {
    id?: string
    memberId: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById: string
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: LoanInstallmentUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutApprovedByInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput>
  }

  export type LoanCreateManyApprovedByInputEnvelope = {
    data: LoanCreateManyApprovedByInput | LoanCreateManyApprovedByInput[]
    skipDuplicates?: boolean
  }

  export type LoanInstallmentCreateWithoutRecordedByInput = {
    id?: string
    installmentNumber: number
    dueDate: Date | string
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise?: number
    paidAt?: Date | string | null
    overdueInterestPaise?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    loan: LoanCreateNestedOneWithoutInstallmentsInput
  }

  export type LoanInstallmentUncheckedCreateWithoutRecordedByInput = {
    id?: string
    loanId: string
    installmentNumber: number
    dueDate: Date | string
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise?: number
    paidAt?: Date | string | null
    overdueInterestPaise?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanInstallmentCreateOrConnectWithoutRecordedByInput = {
    where: LoanInstallmentWhereUniqueInput
    create: XOR<LoanInstallmentCreateWithoutRecordedByInput, LoanInstallmentUncheckedCreateWithoutRecordedByInput>
  }

  export type LoanInstallmentCreateManyRecordedByInputEnvelope = {
    data: LoanInstallmentCreateManyRecordedByInput | LoanInstallmentCreateManyRecordedByInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutAdminInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutAdminInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutAdminInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutAdminInput, AuditLogUncheckedCreateWithoutAdminInput>
  }

  export type AuditLogCreateManyAdminInputEnvelope = {
    data: AuditLogCreateManyAdminInput | AuditLogCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type ContributionRuleUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ContributionRuleWhereUniqueInput
    update: XOR<ContributionRuleUpdateWithoutCreatedByInput, ContributionRuleUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ContributionRuleCreateWithoutCreatedByInput, ContributionRuleUncheckedCreateWithoutCreatedByInput>
  }

  export type ContributionRuleUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ContributionRuleWhereUniqueInput
    data: XOR<ContributionRuleUpdateWithoutCreatedByInput, ContributionRuleUncheckedUpdateWithoutCreatedByInput>
  }

  export type ContributionRuleUpdateManyWithWhereWithoutCreatedByInput = {
    where: ContributionRuleScalarWhereInput
    data: XOR<ContributionRuleUpdateManyMutationInput, ContributionRuleUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ContributionRuleScalarWhereInput = {
    AND?: ContributionRuleScalarWhereInput | ContributionRuleScalarWhereInput[]
    OR?: ContributionRuleScalarWhereInput[]
    NOT?: ContributionRuleScalarWhereInput | ContributionRuleScalarWhereInput[]
    id?: StringFilter<"ContributionRule"> | string
    amountPaise?: IntFilter<"ContributionRule"> | number
    effectiveFromMonth?: IntFilter<"ContributionRule"> | number
    effectiveFromYear?: IntFilter<"ContributionRule"> | number
    createdById?: StringFilter<"ContributionRule"> | string
    createdAt?: DateTimeFilter<"ContributionRule"> | Date | string
  }

  export type PenaltyRuleUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: PenaltyRuleWhereUniqueInput
    update: XOR<PenaltyRuleUpdateWithoutCreatedByInput, PenaltyRuleUncheckedUpdateWithoutCreatedByInput>
    create: XOR<PenaltyRuleCreateWithoutCreatedByInput, PenaltyRuleUncheckedCreateWithoutCreatedByInput>
  }

  export type PenaltyRuleUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: PenaltyRuleWhereUniqueInput
    data: XOR<PenaltyRuleUpdateWithoutCreatedByInput, PenaltyRuleUncheckedUpdateWithoutCreatedByInput>
  }

  export type PenaltyRuleUpdateManyWithWhereWithoutCreatedByInput = {
    where: PenaltyRuleScalarWhereInput
    data: XOR<PenaltyRuleUpdateManyMutationInput, PenaltyRuleUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type PenaltyRuleScalarWhereInput = {
    AND?: PenaltyRuleScalarWhereInput | PenaltyRuleScalarWhereInput[]
    OR?: PenaltyRuleScalarWhereInput[]
    NOT?: PenaltyRuleScalarWhereInput | PenaltyRuleScalarWhereInput[]
    id?: StringFilter<"PenaltyRule"> | string
    amountPaise?: IntFilter<"PenaltyRule"> | number
    effectiveFrom?: DateTimeFilter<"PenaltyRule"> | Date | string
    createdById?: StringFilter<"PenaltyRule"> | string
    createdAt?: DateTimeFilter<"PenaltyRule"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutRecordedByInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutRecordedByInput, PaymentUncheckedUpdateWithoutRecordedByInput>
    create: XOR<PaymentCreateWithoutRecordedByInput, PaymentUncheckedCreateWithoutRecordedByInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutRecordedByInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutRecordedByInput, PaymentUncheckedUpdateWithoutRecordedByInput>
  }

  export type PaymentUpdateManyWithWhereWithoutRecordedByInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutRecordedByInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    memberId?: StringFilter<"Payment"> | string
    month?: IntFilter<"Payment"> | number
    year?: IntFilter<"Payment"> | number
    baseAmountPaise?: IntFilter<"Payment"> | number
    penaltyAmountPaise?: IntFilter<"Payment"> | number
    totalAmountPaise?: IntFilter<"Payment"> | number
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentMethod?: EnumPaymentMethodNullableFilter<"Payment"> | $Enums.PaymentMethod | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    recordedById?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type CharityUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: CharityWhereUniqueInput
    update: XOR<CharityUpdateWithoutCreatedByInput, CharityUncheckedUpdateWithoutCreatedByInput>
    create: XOR<CharityCreateWithoutCreatedByInput, CharityUncheckedCreateWithoutCreatedByInput>
  }

  export type CharityUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: CharityWhereUniqueInput
    data: XOR<CharityUpdateWithoutCreatedByInput, CharityUncheckedUpdateWithoutCreatedByInput>
  }

  export type CharityUpdateManyWithWhereWithoutCreatedByInput = {
    where: CharityScalarWhereInput
    data: XOR<CharityUpdateManyMutationInput, CharityUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type CharityScalarWhereInput = {
    AND?: CharityScalarWhereInput | CharityScalarWhereInput[]
    OR?: CharityScalarWhereInput[]
    NOT?: CharityScalarWhereInput | CharityScalarWhereInput[]
    id?: StringFilter<"Charity"> | string
    title?: StringFilter<"Charity"> | string
    beneficiary?: StringFilter<"Charity"> | string
    purpose?: StringNullableFilter<"Charity"> | string | null
    amountPaise?: IntFilter<"Charity"> | number
    date?: DateTimeFilter<"Charity"> | Date | string
    notes?: StringNullableFilter<"Charity"> | string | null
    imageUrl?: StringNullableFilter<"Charity"> | string | null
    createdById?: StringFilter<"Charity"> | string
    createdAt?: DateTimeFilter<"Charity"> | Date | string
    updatedAt?: DateTimeFilter<"Charity"> | Date | string
  }

  export type LoanUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutCreatedByInput, LoanUncheckedUpdateWithoutCreatedByInput>
    create: XOR<LoanCreateWithoutCreatedByInput, LoanUncheckedCreateWithoutCreatedByInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutCreatedByInput, LoanUncheckedUpdateWithoutCreatedByInput>
  }

  export type LoanUpdateManyWithWhereWithoutCreatedByInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type LoanScalarWhereInput = {
    AND?: LoanScalarWhereInput | LoanScalarWhereInput[]
    OR?: LoanScalarWhereInput[]
    NOT?: LoanScalarWhereInput | LoanScalarWhereInput[]
    id?: StringFilter<"Loan"> | string
    memberId?: StringFilter<"Loan"> | string
    principalPaise?: IntFilter<"Loan"> | number
    monthlyRateBps?: IntFilter<"Loan"> | number
    durationMonths?: IntFilter<"Loan"> | number
    startDate?: DateTimeFilter<"Loan"> | Date | string
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    termsJson?: JsonNullableFilter<"Loan">
    createdById?: StringFilter<"Loan"> | string
    approvedById?: StringNullableFilter<"Loan"> | string | null
    approvedAt?: DateTimeNullableFilter<"Loan"> | Date | string | null
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    updatedAt?: DateTimeFilter<"Loan"> | Date | string
  }

  export type LoanUpsertWithWhereUniqueWithoutApprovedByInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutApprovedByInput, LoanUncheckedUpdateWithoutApprovedByInput>
    create: XOR<LoanCreateWithoutApprovedByInput, LoanUncheckedCreateWithoutApprovedByInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutApprovedByInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutApprovedByInput, LoanUncheckedUpdateWithoutApprovedByInput>
  }

  export type LoanUpdateManyWithWhereWithoutApprovedByInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutApprovedByInput>
  }

  export type LoanInstallmentUpsertWithWhereUniqueWithoutRecordedByInput = {
    where: LoanInstallmentWhereUniqueInput
    update: XOR<LoanInstallmentUpdateWithoutRecordedByInput, LoanInstallmentUncheckedUpdateWithoutRecordedByInput>
    create: XOR<LoanInstallmentCreateWithoutRecordedByInput, LoanInstallmentUncheckedCreateWithoutRecordedByInput>
  }

  export type LoanInstallmentUpdateWithWhereUniqueWithoutRecordedByInput = {
    where: LoanInstallmentWhereUniqueInput
    data: XOR<LoanInstallmentUpdateWithoutRecordedByInput, LoanInstallmentUncheckedUpdateWithoutRecordedByInput>
  }

  export type LoanInstallmentUpdateManyWithWhereWithoutRecordedByInput = {
    where: LoanInstallmentScalarWhereInput
    data: XOR<LoanInstallmentUpdateManyMutationInput, LoanInstallmentUncheckedUpdateManyWithoutRecordedByInput>
  }

  export type LoanInstallmentScalarWhereInput = {
    AND?: LoanInstallmentScalarWhereInput | LoanInstallmentScalarWhereInput[]
    OR?: LoanInstallmentScalarWhereInput[]
    NOT?: LoanInstallmentScalarWhereInput | LoanInstallmentScalarWhereInput[]
    id?: StringFilter<"LoanInstallment"> | string
    loanId?: StringFilter<"LoanInstallment"> | string
    installmentNumber?: IntFilter<"LoanInstallment"> | number
    dueDate?: DateTimeFilter<"LoanInstallment"> | Date | string
    interestDuePaise?: IntFilter<"LoanInstallment"> | number
    principalDuePaise?: IntFilter<"LoanInstallment"> | number
    amountPaidPaise?: IntFilter<"LoanInstallment"> | number
    paidAt?: DateTimeNullableFilter<"LoanInstallment"> | Date | string | null
    overdueInterestPaise?: IntFilter<"LoanInstallment"> | number
    recordedById?: StringNullableFilter<"LoanInstallment"> | string | null
    createdAt?: DateTimeFilter<"LoanInstallment"> | Date | string
    updatedAt?: DateTimeFilter<"LoanInstallment"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutAdminInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutAdminInput, AuditLogUncheckedUpdateWithoutAdminInput>
    create: XOR<AuditLogCreateWithoutAdminInput, AuditLogUncheckedCreateWithoutAdminInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutAdminInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutAdminInput, AuditLogUncheckedUpdateWithoutAdminInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutAdminInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutAdminInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    adminId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableFilter<"AuditLog">
    newValue?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type PaymentCreateWithoutMemberInput = {
    id?: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recordedBy: UserCreateNestedOneWithoutPaymentsRecordedInput
    receipt?: ReceiptCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutMemberInput = {
    id?: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    recordedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    receipt?: ReceiptUncheckedCreateNestedOneWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutMemberInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutMemberInput, PaymentUncheckedCreateWithoutMemberInput>
  }

  export type PaymentCreateManyMemberInputEnvelope = {
    data: PaymentCreateManyMemberInput | PaymentCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type LoanCreateWithoutMemberInput = {
    id?: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutLoansCreatedInput
    approvedBy?: UserCreateNestedOneWithoutLoansApprovedInput
    installments?: LoanInstallmentCreateNestedManyWithoutLoanInput
  }

  export type LoanUncheckedCreateWithoutMemberInput = {
    id?: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById: string
    approvedById?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    installments?: LoanInstallmentUncheckedCreateNestedManyWithoutLoanInput
  }

  export type LoanCreateOrConnectWithoutMemberInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutMemberInput, LoanUncheckedCreateWithoutMemberInput>
  }

  export type LoanCreateManyMemberInputEnvelope = {
    data: LoanCreateManyMemberInput | LoanCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type PaymentUpsertWithWhereUniqueWithoutMemberInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutMemberInput, PaymentUncheckedUpdateWithoutMemberInput>
    create: XOR<PaymentCreateWithoutMemberInput, PaymentUncheckedCreateWithoutMemberInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutMemberInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutMemberInput, PaymentUncheckedUpdateWithoutMemberInput>
  }

  export type PaymentUpdateManyWithWhereWithoutMemberInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutMemberInput>
  }

  export type LoanUpsertWithWhereUniqueWithoutMemberInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutMemberInput, LoanUncheckedUpdateWithoutMemberInput>
    create: XOR<LoanCreateWithoutMemberInput, LoanUncheckedCreateWithoutMemberInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutMemberInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutMemberInput, LoanUncheckedUpdateWithoutMemberInput>
  }

  export type LoanUpdateManyWithWhereWithoutMemberInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutMemberInput>
  }

  export type UserCreateWithoutContributionRulesCreatedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    penaltyRulesCreated?: PenaltyRuleCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutContributionRulesCreatedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    penaltyRulesCreated?: PenaltyRuleUncheckedCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentUncheckedCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityUncheckedCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanUncheckedCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentUncheckedCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutContributionRulesCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContributionRulesCreatedInput, UserUncheckedCreateWithoutContributionRulesCreatedInput>
  }

  export type UserUpsertWithoutContributionRulesCreatedInput = {
    update: XOR<UserUpdateWithoutContributionRulesCreatedInput, UserUncheckedUpdateWithoutContributionRulesCreatedInput>
    create: XOR<UserCreateWithoutContributionRulesCreatedInput, UserUncheckedCreateWithoutContributionRulesCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutContributionRulesCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutContributionRulesCreatedInput, UserUncheckedUpdateWithoutContributionRulesCreatedInput>
  }

  export type UserUpdateWithoutContributionRulesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    penaltyRulesCreated?: PenaltyRuleUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutContributionRulesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    penaltyRulesCreated?: PenaltyRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUncheckedUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUncheckedUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUncheckedUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUncheckedUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateWithoutPenaltyRulesCreatedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutPenaltyRulesCreatedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleUncheckedCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentUncheckedCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityUncheckedCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanUncheckedCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentUncheckedCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutPenaltyRulesCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPenaltyRulesCreatedInput, UserUncheckedCreateWithoutPenaltyRulesCreatedInput>
  }

  export type UserUpsertWithoutPenaltyRulesCreatedInput = {
    update: XOR<UserUpdateWithoutPenaltyRulesCreatedInput, UserUncheckedUpdateWithoutPenaltyRulesCreatedInput>
    create: XOR<UserCreateWithoutPenaltyRulesCreatedInput, UserUncheckedCreateWithoutPenaltyRulesCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPenaltyRulesCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPenaltyRulesCreatedInput, UserUncheckedUpdateWithoutPenaltyRulesCreatedInput>
  }

  export type UserUpdateWithoutPenaltyRulesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutPenaltyRulesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUncheckedUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUncheckedUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUncheckedUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUncheckedUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type MemberCreateWithoutPaymentsInput = {
    id?: string
    memberUid: string
    fullName: string
    phone?: string | null
    email?: string | null
    address?: string | null
    joinDate: Date | string
    exitDate?: Date | string | null
    status?: $Enums.MemberStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutPaymentsInput = {
    id?: string
    memberUid: string
    fullName: string
    phone?: string | null
    email?: string | null
    address?: string | null
    joinDate: Date | string
    exitDate?: Date | string | null
    status?: $Enums.MemberStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    loans?: LoanUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutPaymentsInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutPaymentsInput, MemberUncheckedCreateWithoutPaymentsInput>
  }

  export type UserCreateWithoutPaymentsRecordedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleCreateNestedManyWithoutCreatedByInput
    charitiesCreated?: CharityCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutPaymentsRecordedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleUncheckedCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleUncheckedCreateNestedManyWithoutCreatedByInput
    charitiesCreated?: CharityUncheckedCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanUncheckedCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentUncheckedCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutPaymentsRecordedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsRecordedInput, UserUncheckedCreateWithoutPaymentsRecordedInput>
  }

  export type ReceiptCreateWithoutPaymentInput = {
    id?: string
    receiptNumber: string
    pdfUrl?: string | null
    createdAt?: Date | string
  }

  export type ReceiptUncheckedCreateWithoutPaymentInput = {
    id?: string
    receiptNumber: string
    pdfUrl?: string | null
    createdAt?: Date | string
  }

  export type ReceiptCreateOrConnectWithoutPaymentInput = {
    where: ReceiptWhereUniqueInput
    create: XOR<ReceiptCreateWithoutPaymentInput, ReceiptUncheckedCreateWithoutPaymentInput>
  }

  export type MemberUpsertWithoutPaymentsInput = {
    update: XOR<MemberUpdateWithoutPaymentsInput, MemberUncheckedUpdateWithoutPaymentsInput>
    create: XOR<MemberCreateWithoutPaymentsInput, MemberUncheckedCreateWithoutPaymentsInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutPaymentsInput, MemberUncheckedUpdateWithoutPaymentsInput>
  }

  export type MemberUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberUid?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    exitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberUid?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    exitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loans?: LoanUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type UserUpsertWithoutPaymentsRecordedInput = {
    update: XOR<UserUpdateWithoutPaymentsRecordedInput, UserUncheckedUpdateWithoutPaymentsRecordedInput>
    create: XOR<UserCreateWithoutPaymentsRecordedInput, UserUncheckedCreateWithoutPaymentsRecordedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsRecordedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsRecordedInput, UserUncheckedUpdateWithoutPaymentsRecordedInput>
  }

  export type UserUpdateWithoutPaymentsRecordedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUpdateManyWithoutCreatedByNestedInput
    charitiesCreated?: CharityUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsRecordedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    charitiesCreated?: CharityUncheckedUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUncheckedUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUncheckedUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type ReceiptUpsertWithoutPaymentInput = {
    update: XOR<ReceiptUpdateWithoutPaymentInput, ReceiptUncheckedUpdateWithoutPaymentInput>
    create: XOR<ReceiptCreateWithoutPaymentInput, ReceiptUncheckedCreateWithoutPaymentInput>
    where?: ReceiptWhereInput
  }

  export type ReceiptUpdateToOneWithWhereWithoutPaymentInput = {
    where?: ReceiptWhereInput
    data: XOR<ReceiptUpdateWithoutPaymentInput, ReceiptUncheckedUpdateWithoutPaymentInput>
  }

  export type ReceiptUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiptNumber?: StringFieldUpdateOperationsInput | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiptNumber?: StringFieldUpdateOperationsInput | string
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateWithoutReceiptInput = {
    id?: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutPaymentsInput
    recordedBy: UserCreateNestedOneWithoutPaymentsRecordedInput
  }

  export type PaymentUncheckedCreateWithoutReceiptInput = {
    id?: string
    memberId: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    recordedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutReceiptInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutReceiptInput, PaymentUncheckedCreateWithoutReceiptInput>
  }

  export type PaymentUpsertWithoutReceiptInput = {
    update: XOR<PaymentUpdateWithoutReceiptInput, PaymentUncheckedUpdateWithoutReceiptInput>
    create: XOR<PaymentCreateWithoutReceiptInput, PaymentUncheckedCreateWithoutReceiptInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutReceiptInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutReceiptInput, PaymentUncheckedUpdateWithoutReceiptInput>
  }

  export type PaymentUpdateWithoutReceiptInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutPaymentsNestedInput
    recordedBy?: UserUpdateOneRequiredWithoutPaymentsRecordedNestedInput
  }

  export type PaymentUncheckedUpdateWithoutReceiptInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutCharitiesCreatedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentCreateNestedManyWithoutRecordedByInput
    loansCreated?: LoanCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutCharitiesCreatedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleUncheckedCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleUncheckedCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentUncheckedCreateNestedManyWithoutRecordedByInput
    loansCreated?: LoanUncheckedCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentUncheckedCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutCharitiesCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCharitiesCreatedInput, UserUncheckedCreateWithoutCharitiesCreatedInput>
  }

  export type UserUpsertWithoutCharitiesCreatedInput = {
    update: XOR<UserUpdateWithoutCharitiesCreatedInput, UserUncheckedUpdateWithoutCharitiesCreatedInput>
    create: XOR<UserCreateWithoutCharitiesCreatedInput, UserUncheckedCreateWithoutCharitiesCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCharitiesCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCharitiesCreatedInput, UserUncheckedUpdateWithoutCharitiesCreatedInput>
  }

  export type UserUpdateWithoutCharitiesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUpdateManyWithoutRecordedByNestedInput
    loansCreated?: LoanUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutCharitiesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUncheckedUpdateManyWithoutRecordedByNestedInput
    loansCreated?: LoanUncheckedUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUncheckedUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type MemberCreateWithoutLoansInput = {
    id?: string
    memberUid: string
    fullName: string
    phone?: string | null
    email?: string | null
    address?: string | null
    joinDate: Date | string
    exitDate?: Date | string | null
    status?: $Enums.MemberStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutLoansInput = {
    id?: string
    memberUid: string
    fullName: string
    phone?: string | null
    email?: string | null
    address?: string | null
    joinDate: Date | string
    exitDate?: Date | string | null
    status?: $Enums.MemberStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutLoansInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutLoansInput, MemberUncheckedCreateWithoutLoansInput>
  }

  export type UserCreateWithoutLoansCreatedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutLoansCreatedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleUncheckedCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleUncheckedCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentUncheckedCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityUncheckedCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentUncheckedCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutLoansCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLoansCreatedInput, UserUncheckedCreateWithoutLoansCreatedInput>
  }

  export type UserCreateWithoutLoansApprovedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanCreateNestedManyWithoutCreatedByInput
    installmentsRecorded?: LoanInstallmentCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutLoansApprovedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleUncheckedCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleUncheckedCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentUncheckedCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityUncheckedCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanUncheckedCreateNestedManyWithoutCreatedByInput
    installmentsRecorded?: LoanInstallmentUncheckedCreateNestedManyWithoutRecordedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutLoansApprovedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLoansApprovedInput, UserUncheckedCreateWithoutLoansApprovedInput>
  }

  export type LoanInstallmentCreateWithoutLoanInput = {
    id?: string
    installmentNumber: number
    dueDate: Date | string
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise?: number
    paidAt?: Date | string | null
    overdueInterestPaise?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    recordedBy?: UserCreateNestedOneWithoutInstallmentsRecordedInput
  }

  export type LoanInstallmentUncheckedCreateWithoutLoanInput = {
    id?: string
    installmentNumber: number
    dueDate: Date | string
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise?: number
    paidAt?: Date | string | null
    overdueInterestPaise?: number
    recordedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanInstallmentCreateOrConnectWithoutLoanInput = {
    where: LoanInstallmentWhereUniqueInput
    create: XOR<LoanInstallmentCreateWithoutLoanInput, LoanInstallmentUncheckedCreateWithoutLoanInput>
  }

  export type LoanInstallmentCreateManyLoanInputEnvelope = {
    data: LoanInstallmentCreateManyLoanInput | LoanInstallmentCreateManyLoanInput[]
    skipDuplicates?: boolean
  }

  export type MemberUpsertWithoutLoansInput = {
    update: XOR<MemberUpdateWithoutLoansInput, MemberUncheckedUpdateWithoutLoansInput>
    create: XOR<MemberCreateWithoutLoansInput, MemberUncheckedCreateWithoutLoansInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutLoansInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutLoansInput, MemberUncheckedUpdateWithoutLoansInput>
  }

  export type MemberUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberUid?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    exitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberUid?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    exitDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type UserUpsertWithoutLoansCreatedInput = {
    update: XOR<UserUpdateWithoutLoansCreatedInput, UserUncheckedUpdateWithoutLoansCreatedInput>
    create: XOR<UserCreateWithoutLoansCreatedInput, UserUncheckedCreateWithoutLoansCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLoansCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLoansCreatedInput, UserUncheckedUpdateWithoutLoansCreatedInput>
  }

  export type UserUpdateWithoutLoansCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutLoansCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUncheckedUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUncheckedUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUncheckedUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserUpsertWithoutLoansApprovedInput = {
    update: XOR<UserUpdateWithoutLoansApprovedInput, UserUncheckedUpdateWithoutLoansApprovedInput>
    create: XOR<UserCreateWithoutLoansApprovedInput, UserUncheckedCreateWithoutLoansApprovedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLoansApprovedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLoansApprovedInput, UserUncheckedUpdateWithoutLoansApprovedInput>
  }

  export type UserUpdateWithoutLoansApprovedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUpdateManyWithoutCreatedByNestedInput
    installmentsRecorded?: LoanInstallmentUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutLoansApprovedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUncheckedUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUncheckedUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUncheckedUpdateManyWithoutCreatedByNestedInput
    installmentsRecorded?: LoanInstallmentUncheckedUpdateManyWithoutRecordedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type LoanInstallmentUpsertWithWhereUniqueWithoutLoanInput = {
    where: LoanInstallmentWhereUniqueInput
    update: XOR<LoanInstallmentUpdateWithoutLoanInput, LoanInstallmentUncheckedUpdateWithoutLoanInput>
    create: XOR<LoanInstallmentCreateWithoutLoanInput, LoanInstallmentUncheckedCreateWithoutLoanInput>
  }

  export type LoanInstallmentUpdateWithWhereUniqueWithoutLoanInput = {
    where: LoanInstallmentWhereUniqueInput
    data: XOR<LoanInstallmentUpdateWithoutLoanInput, LoanInstallmentUncheckedUpdateWithoutLoanInput>
  }

  export type LoanInstallmentUpdateManyWithWhereWithoutLoanInput = {
    where: LoanInstallmentScalarWhereInput
    data: XOR<LoanInstallmentUpdateManyMutationInput, LoanInstallmentUncheckedUpdateManyWithoutLoanInput>
  }

  export type LoanCreateWithoutInstallmentsInput = {
    id?: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member: MemberCreateNestedOneWithoutLoansInput
    createdBy: UserCreateNestedOneWithoutLoansCreatedInput
    approvedBy?: UserCreateNestedOneWithoutLoansApprovedInput
  }

  export type LoanUncheckedCreateWithoutInstallmentsInput = {
    id?: string
    memberId: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById: string
    approvedById?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanCreateOrConnectWithoutInstallmentsInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutInstallmentsInput, LoanUncheckedCreateWithoutInstallmentsInput>
  }

  export type UserCreateWithoutInstallmentsRecordedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanCreateNestedManyWithoutApprovedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutInstallmentsRecordedInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleUncheckedCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleUncheckedCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentUncheckedCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityUncheckedCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanUncheckedCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutInstallmentsRecordedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInstallmentsRecordedInput, UserUncheckedCreateWithoutInstallmentsRecordedInput>
  }

  export type LoanUpsertWithoutInstallmentsInput = {
    update: XOR<LoanUpdateWithoutInstallmentsInput, LoanUncheckedUpdateWithoutInstallmentsInput>
    create: XOR<LoanCreateWithoutInstallmentsInput, LoanUncheckedCreateWithoutInstallmentsInput>
    where?: LoanWhereInput
  }

  export type LoanUpdateToOneWithWhereWithoutInstallmentsInput = {
    where?: LoanWhereInput
    data: XOR<LoanUpdateWithoutInstallmentsInput, LoanUncheckedUpdateWithoutInstallmentsInput>
  }

  export type LoanUpdateWithoutInstallmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutLoansNestedInput
    createdBy?: UserUpdateOneRequiredWithoutLoansCreatedNestedInput
    approvedBy?: UserUpdateOneWithoutLoansApprovedNestedInput
  }

  export type LoanUncheckedUpdateWithoutInstallmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById?: StringFieldUpdateOperationsInput | string
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutInstallmentsRecordedInput = {
    update: XOR<UserUpdateWithoutInstallmentsRecordedInput, UserUncheckedUpdateWithoutInstallmentsRecordedInput>
    create: XOR<UserCreateWithoutInstallmentsRecordedInput, UserUncheckedCreateWithoutInstallmentsRecordedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInstallmentsRecordedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInstallmentsRecordedInput, UserUncheckedUpdateWithoutInstallmentsRecordedInput>
  }

  export type UserUpdateWithoutInstallmentsRecordedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUpdateManyWithoutApprovedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutInstallmentsRecordedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUncheckedUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUncheckedUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUncheckedUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentCreateNestedManyWithoutRecordedByInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name?: string | null
    passwordHash: string
    role?: $Enums.UserRole
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contributionRulesCreated?: ContributionRuleUncheckedCreateNestedManyWithoutCreatedByInput
    penaltyRulesCreated?: PenaltyRuleUncheckedCreateNestedManyWithoutCreatedByInput
    paymentsRecorded?: PaymentUncheckedCreateNestedManyWithoutRecordedByInput
    charitiesCreated?: CharityUncheckedCreateNestedManyWithoutCreatedByInput
    loansCreated?: LoanUncheckedCreateNestedManyWithoutCreatedByInput
    loansApproved?: LoanUncheckedCreateNestedManyWithoutApprovedByInput
    installmentsRecorded?: LoanInstallmentUncheckedCreateNestedManyWithoutRecordedByInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUpdateManyWithoutRecordedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contributionRulesCreated?: ContributionRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    penaltyRulesCreated?: PenaltyRuleUncheckedUpdateManyWithoutCreatedByNestedInput
    paymentsRecorded?: PaymentUncheckedUpdateManyWithoutRecordedByNestedInput
    charitiesCreated?: CharityUncheckedUpdateManyWithoutCreatedByNestedInput
    loansCreated?: LoanUncheckedUpdateManyWithoutCreatedByNestedInput
    loansApproved?: LoanUncheckedUpdateManyWithoutApprovedByNestedInput
    installmentsRecorded?: LoanInstallmentUncheckedUpdateManyWithoutRecordedByNestedInput
  }

  export type ContributionRuleCreateManyCreatedByInput = {
    id?: string
    amountPaise: number
    effectiveFromMonth: number
    effectiveFromYear: number
    createdAt?: Date | string
  }

  export type PenaltyRuleCreateManyCreatedByInput = {
    id?: string
    amountPaise: number
    effectiveFrom: Date | string
    createdAt?: Date | string
  }

  export type PaymentCreateManyRecordedByInput = {
    id?: string
    memberId: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CharityCreateManyCreatedByInput = {
    id?: string
    title: string
    beneficiary: string
    purpose?: string | null
    amountPaise: number
    date: Date | string
    notes?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanCreateManyCreatedByInput = {
    id?: string
    memberId: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedById?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanCreateManyApprovedByInput = {
    id?: string
    memberId: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById: string
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanInstallmentCreateManyRecordedByInput = {
    id?: string
    loanId: string
    installmentNumber: number
    dueDate: Date | string
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise?: number
    paidAt?: Date | string | null
    overdueInterestPaise?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyAdminInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type ContributionRuleUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFromMonth?: IntFieldUpdateOperationsInput | number
    effectiveFromYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributionRuleUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFromMonth?: IntFieldUpdateOperationsInput | number
    effectiveFromYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContributionRuleUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFromMonth?: IntFieldUpdateOperationsInput | number
    effectiveFromYear?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PenaltyRuleUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PenaltyRuleUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PenaltyRuleUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountPaise?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutRecordedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutPaymentsNestedInput
    receipt?: ReceiptUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutRecordedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt?: ReceiptUncheckedUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateManyWithoutRecordedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    beneficiary?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    amountPaise?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    beneficiary?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    amountPaise?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CharityUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    beneficiary?: StringFieldUpdateOperationsInput | string
    purpose?: NullableStringFieldUpdateOperationsInput | string | null
    amountPaise?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutLoansNestedInput
    approvedBy?: UserUpdateOneWithoutLoansApprovedNestedInput
    installments?: LoanInstallmentUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: LoanInstallmentUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUpdateWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutLoansNestedInput
    createdBy?: UserUpdateOneRequiredWithoutLoansCreatedNestedInput
    installments?: LoanInstallmentUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: LoanInstallmentUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateManyWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanInstallmentUpdateWithoutRecordedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestDuePaise?: IntFieldUpdateOperationsInput | number
    principalDuePaise?: IntFieldUpdateOperationsInput | number
    amountPaidPaise?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    overdueInterestPaise?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loan?: LoanUpdateOneRequiredWithoutInstallmentsNestedInput
  }

  export type LoanInstallmentUncheckedUpdateWithoutRecordedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestDuePaise?: IntFieldUpdateOperationsInput | number
    principalDuePaise?: IntFieldUpdateOperationsInput | number
    amountPaidPaise?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    overdueInterestPaise?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanInstallmentUncheckedUpdateManyWithoutRecordedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    loanId?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestDuePaise?: IntFieldUpdateOperationsInput | number
    principalDuePaise?: IntFieldUpdateOperationsInput | number
    amountPaidPaise?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    overdueInterestPaise?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyMemberInput = {
    id?: string
    month: number
    year: number
    baseAmountPaise: number
    penaltyAmountPaise?: number
    totalAmountPaise: number
    status?: $Enums.PaymentStatus
    paymentMethod?: $Enums.PaymentMethod | null
    paidAt?: Date | string | null
    recordedById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanCreateManyMemberInput = {
    id?: string
    principalPaise: number
    monthlyRateBps: number
    durationMonths: number
    startDate: Date | string
    status?: $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById: string
    approvedById?: string | null
    approvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recordedBy?: UserUpdateOneRequiredWithoutPaymentsRecordedNestedInput
    receipt?: ReceiptUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt?: ReceiptUncheckedUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    baseAmountPaise?: IntFieldUpdateOperationsInput | number
    penaltyAmountPaise?: IntFieldUpdateOperationsInput | number
    totalAmountPaise?: IntFieldUpdateOperationsInput | number
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordedById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutLoansCreatedNestedInput
    approvedBy?: UserUpdateOneWithoutLoansApprovedNestedInput
    installments?: LoanInstallmentUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById?: StringFieldUpdateOperationsInput | string
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    installments?: LoanInstallmentUncheckedUpdateManyWithoutLoanNestedInput
  }

  export type LoanUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    principalPaise?: IntFieldUpdateOperationsInput | number
    monthlyRateBps?: IntFieldUpdateOperationsInput | number
    durationMonths?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    termsJson?: NullableJsonNullValueInput | InputJsonValue
    createdById?: StringFieldUpdateOperationsInput | string
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanInstallmentCreateManyLoanInput = {
    id?: string
    installmentNumber: number
    dueDate: Date | string
    interestDuePaise: number
    principalDuePaise: number
    amountPaidPaise?: number
    paidAt?: Date | string | null
    overdueInterestPaise?: number
    recordedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LoanInstallmentUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestDuePaise?: IntFieldUpdateOperationsInput | number
    principalDuePaise?: IntFieldUpdateOperationsInput | number
    amountPaidPaise?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    overdueInterestPaise?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recordedBy?: UserUpdateOneWithoutInstallmentsRecordedNestedInput
  }

  export type LoanInstallmentUncheckedUpdateWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestDuePaise?: IntFieldUpdateOperationsInput | number
    principalDuePaise?: IntFieldUpdateOperationsInput | number
    amountPaidPaise?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    overdueInterestPaise?: IntFieldUpdateOperationsInput | number
    recordedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanInstallmentUncheckedUpdateManyWithoutLoanInput = {
    id?: StringFieldUpdateOperationsInput | string
    installmentNumber?: IntFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    interestDuePaise?: IntFieldUpdateOperationsInput | number
    principalDuePaise?: IntFieldUpdateOperationsInput | number
    amountPaidPaise?: IntFieldUpdateOperationsInput | number
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    overdueInterestPaise?: IntFieldUpdateOperationsInput | number
    recordedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}