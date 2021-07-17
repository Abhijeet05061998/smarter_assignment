import React, { useState, useEffect } from "react";

export default function NestedList() {
  const [items, setItems] = useState([]);
var count=1;
  var arr1 = [];
  var arr2 = [];
  var arr3 = [];
  var result = {
     Name: [],
    Child: [],
     Item: [],
  };
  useEffect(() => {
    fetch("https://api.npoint.io/93bed93a99df4c91044e")
      .then((res) => res.json())
      .then((result) => {
        const obj = result.body.Recommendations;
        console.log(obj);
        fun(obj);
        setItems(obj);
      });
  }, );

  const fun = (obj) => {
    let count = 1;
    var queue = [];
    for (let i = 0; i < obj.length; i++) {
      arr1.push(obj[i].RestaurantName);
      let Menu = obj[i].menu;
      for (let j = 0; j < Menu.length; j++) {
        if (Menu[j].type === "sectionheader") {
          let child = Menu[j].children;
          arr2.push(count);
          queue.push(child);
          while (queue.length !== 0) {
            let front = queue[0];
            queue.shift();

            for (var s = 0; s < front.length; s++) {
              if (front[s].type === "item" && front[s].selected === 1) {
                arr3.push(front[s].name);
              }
              if (front[s].selected === 1) {
                queue.push(front[s].children);
              }
            }
            // console.log(arr3);
          }
        }
      }
    }
    console.log(arr1);
    console.log(arr2);
    console.log(arr3);
    result["Name"].push(arr1);
    result["Child"].push(arr2);
    result["Item"].push(arr3);
    console.log(result);
  };

  return(
    <div className="users">
      {items.map((ele)=><li>
        {"---->" +ele.RestaurantName}
        <li>{"---->Child" + count}</li>
        <li>{arr3}</li>
        </li>)}
     
    </div>
  );
}
