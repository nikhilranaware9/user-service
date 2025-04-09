const { EntitySchema } = require('typeorm');

const Role = new EntitySchema({
  name: 'Role',
  tableName: 'roles',
  columns: {
    role_id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 50,
      unique: true,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
    },
    deleted_at: {
      type: 'timestamp',
      nullable: true,
      deleteDate: true,
    },
  },
  relations: {
    users: {
      type: 'one-to-many',
      target: 'User',
      inverseSide: 'role',
    },
    rolePermissions: {
      type: 'one-to-many',
      target: 'RolePermission',
      inverseSide: 'role',
    },
  },
});

module.exports = { Role };
