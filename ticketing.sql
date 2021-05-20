/*
Navicat MySQL Data Transfer

Source Server         : admir
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : ticketing

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2021-05-20 22:36:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user` varchar(255) NOT NULL,
  `psw` varchar(255) NOT NULL,
  UNIQUE KEY `user` (`user`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1111@qq.com', '111111');
INSERT INTO `user` VALUES ('111@qq.com', 'admire');
INSERT INTO `user` VALUES ('1234@qq.com', '1212212');
INSERT INTO `user` VALUES ('123@qq.com', '111111');
