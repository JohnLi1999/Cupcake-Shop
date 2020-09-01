INSERT INTO `roles` VALUES (1,'ROLE_USER'),(2,'ROLE_ADMIN');
INSERT INTO `tags` VALUES (1,'TODAY_SPECIAL'),(2,'BEST_SELLING');
INSERT INTO `users` VALUES (1,'2020-09-01 04:27:49.163000','2020-09-01 04:27:49.163000','Admin Street','admin@admin.com','$2a$10$A8wOYffrCbgtvt/B4Dt6COIyCmiZT4nIAmv4BZ4DrbjSMBZ8huwA6','admin'),(2,'2020-09-01 04:27:49.289000','2020-09-01 04:27:49.289000','User Street','user@user.com','$2a$10$4NGGaHDPuODWHKN2SfTP/uZurVHBkeEx61Gc8aeXOMpU6sgvSbpI2','user');
INSERT INTO `user_roles` VALUES (1,1),(2,1),(1,2);
INSERT INTO `categories` VALUES (1,'2020-09-01 04:27:49.298000','2020-09-01 04:27:49.298000',1,1,'Whipped Cream'),(2,'2020-09-01 04:28:53.563000','2020-09-01 04:28:53.563000',1,1,'Mousse Slices'),(3,'2020-09-01 04:29:06.367000','2020-09-01 04:29:06.367000',1,1,'Tower'),(4,'2020-09-01 04:29:14.430000','2020-09-01 04:29:14.430000',1,1,'Cake Square');
INSERT INTO `cakes` VALUES (1,'2020-09-01 04:27:49.319000','2020-09-01 04:31:23.985000','1-1.jpg','Mocca whipped cream in a Callebaut chocolate shell. Garnished with walnut and bits of hazelnut. Fantastic taste!','1-2.jpg','1-3.jpg','Mocca Wipped Cream Shells',2.25,200,1),(2,'2020-09-01 04:41:42.295000','2020-09-01 05:06:45.909000','2-1.jpg','A light moist sponge cake with your favourite buttercream. Enjoy this pastry with coffee','2-2.jpg','2-3.jpg','Strawberry Square',2.39,150,4),(3,'2020-09-01 04:43:14.389000','2020-09-01 04:43:14.389000','3-1.jpg','A light pastry, with tasty chocolate mousse on sponge cake drizzled with orange liqueur. Enjoy anytime, it is a great dessert!','3-2.jpg','3-3.jpg','Chocolate Mousse Slices',2.25,200,2),(4,'2020-09-01 04:44:58.538000','2020-09-01 05:07:14.045000','4-1.jpg','A frangipane tart topped with whipped cream that is covered with almonds and glazed apricot. With coffee or as a wonderful dessert.','4-2.jpg','4-3.jpg','Whipped Cream Tarts',2.55,150,1),(5,'2020-09-01 04:45:48.124000','2020-09-01 05:08:24.228000','5-1.jpg','Strawberry Mousse garnished with whipped cream in a Callebaut chocolate shell A perfect dessert for guests at home.','5-2.jpg','5-3.jpg','Strawberry Mousse Slices',2.35,100,2),(6,'2020-09-01 04:46:51.718000','2020-09-01 05:08:45.730000','6-1.jpg','A frangipane tart topped with whipped cream that is covered with almonds and glazed apricot. With coffee or as a wonderful dessert.','6-2.jpg','6-3.jpg','White Chocolate Cranberry Slices',2.75,50,2),(7,'2020-09-01 04:48:08.992000','2020-09-01 04:48:08.992000','7-1.jpg','The fresh whipped cream goes so well with our lemon filling and is made much more enjoyable with our pie dough. A treat that is a favourite.','7-2.jpg','7-3.jpg','Tarts Lemon Whipped Cream',1.25,300,1),(8,'2020-09-01 04:48:56.588000','2020-09-01 05:08:57.446000','8-1.jpg','Lime at its best. Our delightful pie pastry tart filled with Keylime filling and garnished with whipped cream','8-2.jpg','8-3.jpg','Tarts Keylime Whipped Cream',1.25,300,1),(9,'2020-09-01 04:49:49.494000','2020-09-01 05:09:14.920000','9-1.jpg','Maple Mousse garnished with whipped cream. Garnished with walnut and bits of hazelnut. Fantastic taste!','9-2.jpg','9-3.jpg','Maple Tower',2.35,100,3),(10,'2020-09-01 04:50:38.305000','2020-09-01 05:09:24.184000','10-1.jpg','Chocolate Mousse garnished with whipped cream in a Callebaut chocolate shell. For chocolate Lovers.','10-2.jpg','10-3.jpg','Chocolate Tower',3.95,150,3),(11,'2020-09-01 04:52:13.069000','2020-09-01 04:52:13.069000','11-1.jpg','Whipped cream flavoured with raspberries. A real treat!','11-2.jpg','11-3.jpg','Raspberry Tower',3.25,150,3),(12,'2020-09-01 04:58:00.399000','2020-09-01 05:00:29.519000','12-1.jpg','Our wonderful Tiramisu Filling presented as a dessert cup. A light tasty finish to your meal.','12-2.jpg','12-3.jpg','Tiramisu Cup',4.35,125,1),(13,'2020-09-01 04:58:53.728000','2020-09-01 05:10:01.536000','13-1.jpg','The taste of coconut and baked walnuts make this a favourite square.','13-2.jpg','13-3.jpg','Walnut Square',2.75,250,4),(14,'2020-09-01 04:59:33.900000','2020-09-01 04:59:33.900000','14-1.jpg','The natural taste of dates and oatmeal. Just like when we were kids.','14-2.jpg','14-3.jpg','Date Square',2.25,150,4);
INSERT INTO `cake_tags` VALUES (1,1),(10,1),(12,1),(1,2),(2,2),(4,2),(5,2),(6,2),(8,2),(9,2),(10,2),(12,2),(13,2);




