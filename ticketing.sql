/*
Navicat MySQL Data Transfer

Source Server         : admir
Source Server Version : 50536
Source Host           : 127.0.0.1:3306
Source Database       : ticketing

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2021-06-15 22:04:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for checkcode
-- ----------------------------
DROP TABLE IF EXISTS `checkcode`;
CREATE TABLE `checkcode` (
  `email` varchar(30) NOT NULL,
  `code` varchar(10) NOT NULL,
  PRIMARY KEY (`email`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of checkcode
-- ----------------------------

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `email` varchar(18) CHARACTER SET utf8 NOT NULL,
  `movie` varchar(40) CHARACTER SET utf8 NOT NULL,
  `amount` int(5) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES ('2431424266@qq.com', '多啦A梦', '30', '2021-06-15 13:59:32');

-- ----------------------------
-- Table structure for manage
-- ----------------------------
DROP TABLE IF EXISTS `manage`;
CREATE TABLE `manage` (
  `user` varchar(30) NOT NULL,
  `psw` varchar(30) NOT NULL,
  PRIMARY KEY (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of manage
-- ----------------------------
INSERT INTO `manage` VALUES ('admir', 'admir');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user` varchar(30) NOT NULL,
  `psw` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`user`),
  UNIQUE KEY `user` (`user`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2431424266@qq.com', '111111', 'lcx');
