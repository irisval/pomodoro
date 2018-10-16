(function(n) {

	function main() {
		document.getElementById("add-todo-submit").addEventListener("click", function() {
			let todo = document.getElementById("add-todo-input").value;	
			let todoDiv = document.createElement("div");

			let item = document.createElement("li");
			
			let btn1 = document.createElement('button');
			btn1.className += 'deleteTodo'
			btn1.innerHTML = '<i class="fa fa-times fa-lg del-word"></i>';
			btn1.addEventListener('click', function(){
				this.parentElement.style.display = "none";
			});


			let btn2 = document.createElement('button')
			btn2.innerHTML = '<i class="fa fa-plus"></i>';
			btn2.addEventListener('click', function(){
				let goal = document.getElementById("pomodoro-task");
				goal.innerHTML += todoDiv.innerHTML;
			});

			let done = document.createElement('button')
			done.innerHTML = '<i class="fa fa-check-square"></i>';
			done.addEventListener('click', function(){
				item.setAttribute("style", "text-decoration: line-through;")
			});



			todoDiv.append(done);
			item.appendChild(document.createTextNode(todo));
			todoDiv.appendChild(item);
			todoDiv.appendChild(btn1);
			todoDiv.appendChild(btn2);

			document.getElementById("todo-list").appendChild(todoDiv);
		});

		

	}
	


n(function() {
	main();
})
})(jQuery);