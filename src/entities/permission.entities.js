const { EntitySchema } = require('typeorm');

const Permission = new EntitySchema({
  name: 'Permission',
  tableName: 'permissions',
  columns: {
    permission_id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 100,
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
    rolePermissions: {
      type: 'one-to-many',
      target: 'RolePermission',
      inverseSide: 'permission',
    },
  },
});

module.exports = { Permission };
