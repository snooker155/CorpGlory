
// function getNextSequenceValueProduct(sequenceName){
//   Counters_product.update(sequenceName,
//     {
//       $inc:{sequence_value:1},
//       //new:true
//     });
//   var sequenceDocument = Counters_product.findOne("productId");
//   return sequenceDocument.sequence_value;
// }


// function getNextSequenceValueOrder(sequenceName){
//   Counters_order.update(sequenceName,
//     {
//        $inc:{sequence_value:1},
//        //new:true
//     });
//   var sequenceDocument = Counters_order.findOne("orderId");
//   return sequenceDocument.sequence_value;
// }

// if (Meteor.isServer) {

//   Meteor.startup(function () {
//       Counters_product.remove("productId");

//       Counters_product.insert({
//         "_id": "productId",
//         "sequence_value": 0
//       });


//       Counters_order.remove("orderId");

//       Counters_order.insert({
//         "_id": "orderId",
//         "sequence_value": 0
//       });
//   });


// }




if (Meteor.isClient) {


  Meteor.subscribe("users");
  Meteor.subscribe("companies");
  Meteor.subscribe("employees");
  Meteor.subscribe("departments");
  Meteor.subscribe("spheres");
  Meteor.subscribe("segments");
  Meteor.subscribe("countries");
  Meteor.subscribe("news");
  Meteor.subscribe("projects");
  Meteor.subscribe("products");
  Meteor.subscribe("product_positions");
  Meteor.subscribe("orders");
  Meteor.subscribe("resources");
  Meteor.subscribe("technologies");
  Meteor.subscribe("technology_list");
  Meteor.subscribe("inProductions");
  Meteor.subscribe("inStorehouses");
  Meteor.subscribe("inSaleses");

}
