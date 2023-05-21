'use strict';

module.exports = {
  //Up: Thêm dữ liệu
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: "user@gmail.com",
      password: "use123",
      firstName: "Phong",
      lastName: "Duong",
      address: "Lang Bo",
      gender: 1,
      roleId: "R1",
      phoneNumber: "0123456789",
      positionId: "P1",
      image: "",
      createdAt: new Date(),
      updatedAt:  new Date(),
    }])
  },
  //Down:  Bac lại khi bị lỗi
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
