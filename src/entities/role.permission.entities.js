const { EntitySchema } = require('typeorm');

const RolePermission = new EntitySchema({
  name: 'RolePermission',
  tableName: 'role_permissions',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
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
    role: {
      type: 'many-to-one',
      target: 'Role',
      joinColumn: {
        name: 'role_id',
      },
      inverseSide: 'rolePermissions',
    },
    permission: {
      type: 'many-to-one',
      target: 'Permission',
      joinColumn: {
        name: 'permission_id',
      },
      inverseSide: 'rolePermissions',
    },
  },
});

module.exports = { RolePermission };
