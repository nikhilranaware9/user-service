const { EntitySchema } = require('typeorm');
const { Account } = require('./Account');
const { Notification } = require('./Notification');
const { Role } = require('./Role');

const User = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    user_id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 100,
    },
    email: {
      type: 'varchar',
      length: 100,
      unique: true,
    },
    password_hash: {
      type: 'text',
    },
    phone: {
      type: 'varchar',
      length: 20,
      unique: true,
    },
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    updated_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    deleted_at: {
      type: 'timestamp',
      nullable: true,
    },
  },
  relations: {
    accounts: {
      type: 'one-to-many',
      target: 'Account',
      inverseSide: 'user',
    },
    notifications: {
      type: 'one-to-many',
      target: 'Notification',
      inverseSide: 'user',
    },
    role: {
      type: 'many-to-one',
      target: 'Role',
      joinColumn: {
        name: 'role_id',
      },
      inverseSide: 'users',
    },
  },
});

module.exports = { User };
