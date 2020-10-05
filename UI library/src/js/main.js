import $ from "./lib/lib";

$(".wrap").html(
  `       
  <div class="dropdown">
    <div class="btn btn-primary dropdown-toggle" id="dropdownMenuBtn">Dropdown button</div>
    <ul class="dropdown-menu" data-toggle-id="dropdownMenuBtn">
      <li>
        <a href="#" class="dropdown-item">Action item 1</a></li>
      <li>
        <a href="#" class="dropdown-item">Action item 2</a></li>
      <li>
        <a href="#" class="dropdown-item">Action item 3</a></li>
    </ul>
  </div>

`
);
$(".dropdown-toggle").dropdown();

$("#trigger").click(() => {
  $("#trigger").createModal({
    text: {
      title: "Modal title",
      body:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste tenetur quod impedit natus optio libero molestias ut alias nihil ipsam expedita, facilis voluptatum, quos, in ipsum porro corrupti consequuntur ullam?",
    },
    btns: {
      count: 3,
      settings: [
        ["close", ["btn-danger", "mr-10"], true],
        [
          "Save changes",
          ["btn-success"],
          false,
          () => {
            alert("Данные сохранены");
          },
        ],
        [
          "another btn",
          ["btn-warning", "ml-10"],
          false,
          () => {
            alert("Другая кнопка");
          },
        ],
      ],
    },
  });
});

$()
  .get("http://localhost:3000/styles")
  .then((res) => console.log(res));

  $()
  .post("http://localhost:3000/styles", '{id:hello json-server}')
  .then((res) => console.log(res));