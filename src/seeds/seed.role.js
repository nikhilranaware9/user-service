// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const fs = require('fs');
const path = require('path');

// Import database connection and entities
const { AppDataSource } = require('../config/db.connection');
const { Role } = require('../entities/Role');
const { Permission } = require('../entities/Permission');
const { RolePermission } = require('../entities/RolePermission');

// Seed function to insert roles and permissions from roles.json
const seedRolesAndPermissions = async () => {
  // Initialize the database connection
  await AppDataSource.initialize();

  // Get repositories for entities
  const roleRepo = AppDataSource.getRepository(Role);
  const permissionRepo = AppDataSource.getRepository(Permission);
  const rolePermRepo = AppDataSource.getRepository(RolePermission);

  // Read and parse the roles.json file
  const filePath = path.join(__dirname, 'roles.json');
  const { roles } = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Loop through each role in the JSON file
  for (const { name, description, permissions } of roles) {
    // Check if role already exists in DB
    let role = await roleRepo.findOne({ where: { name } });

    // If role doesn't exist, create and save it
    if (!role) {
      role = roleRepo.create({ name, description });
      await roleRepo.save(role);
    }

    // Loop through each permission under the role
    for (const permName of permissions) {
      // Check if permission exists
      let permission = await permissionRepo.findOne({ where: { name: permName } });

      // If permission doesn't exist, create and save it
      if (!permission) {
        permission = permissionRepo.create({ name: permName });
        await permissionRepo.save(permission);
      }

      // Check if this role-permission relationship already exists
      const existing = await rolePermRepo.findOne({
        where: {
          role: { role_id: role.role_id },
          permission: { permission_id: permission.permission_id }
        }
      });

      // If not exists, create role-permission mapping
      if (!existing) {
        const rolePerm = rolePermRepo.create({ role, permission });
        await rolePermRepo.save(rolePerm);
      }
    }
  }

  // Final log to indicate success
  console.log('Roles and permissions seeded successfully!');
  process.exit(); // Exit the process
};

// Run the seeding script and catch any errors
seedRolesAndPermissions().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1); // Exit with failure code
});
