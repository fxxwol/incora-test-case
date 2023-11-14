const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          set(value) {
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashedPassword);
          },
        },
      })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
