/*
Navicat MySQL Data Transfer

Source Server         : admir
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : ticketing

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2021-06-01 22:45:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for checkcode
-- ----------------------------
DROP TABLE IF EXISTS `checkcode`;
CREATE TABLE `checkcode` (
  `email` varchar(30) NOT NULL,
  `code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of checkcode
-- ----------------------------
INSERT INTO `checkcode` VALUES ('2431424266@qq.com', '621345');

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
INSERT INTO `user` VALUES ('2431424266@qq.com', '123123');
INSERT INTO `user` VALUES ('3390453143@qq.com', '1878703204wsn3');
