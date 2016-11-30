let student = {
	name : "Vasya",
	soname : "Pupkin",
	age : 24,
	courses : [
	{
		nameCourse : "JS",
		nameLector : "Maestro",
		hoursOfCourse : 100,
		passOfCourse : 0.5,
		marks : [3,4,5,5,3,5,5]
	},
	{
		nameCourse : "HTML",
		nameLector : "Omar",
		hoursOfCourse : 50,
		passOfCourse : 1,
		marks : [5,4,5,5,5]
	}
				],

	getName: function() {
		return `${this.name} ${this.soname}`
	},

	getAge: function() {
		return `${this.age} years old`;
	},

	addNewCourse: function(teacherName, course, duration) {
		if (typeof(teacherName) === "string" && typeof(course) === "string"){
				this.courses.push(
				{
					nameCourse : course,
					nameLector : teacherName,
					hoursOfCourse : duration,
					passOfCourse: 0,
					marks: []
				});
		}
	},

	getAvarageMarkByCourse: function(course) {
		let  countOfMarks = 0; sumOfMarks = 0;

		this.courses.forEach( function(el){
			if (el.nameCourse === course){
				el.marks.forEach( 
					function(e) { sumOfMarks += e; 
						countOfMarks++;
					}

				)
			}
			else return null;
		});

		if (!countOfMarks == 0){
		return (sumOfMarks/countOfMarks).toFixed(2);
		}	
		else return null;
	},

	getAvarageMark: function(){
		let  countOfMarks = 0; sumOfMarks = 0;

		this.courses.forEach( function(el){
			el.marks.forEach( 
				function(e) { sumOfMarks += e; 
						countOfMarks++;
				}

			)
		});
		return (sumOfMarks/countOfMarks).toFixed(2);
	},

	addMark: function(course, mark) {
		let correctMarks = [1,2,3,4,5]
		if (correctMarks.includes(mark)){
			this.courses.forEach( function(el){
				if (el.nameCourse === course){
					el.marks.push(mark);
					}
			});
		}
	},

	addProgress: function(course, hours) {
		if (typeof(hours) === "number" && typeof(course) === "string"){
			this.courses.forEach( function(el){
				if (el.nameCourse === course && (el.hoursOfCourse*(1 - el.passOfCourse) - hours) >= 0){
					 el.passOfCourse += hours/el.hoursOfCourse;
					}
			});
		}
	},

	getProgress: function(course) {
		let result;
		if (typeof(course) === "string"){
			this.courses.forEach( function(el){
				if (el.nameCourse === course){
					 result = el.passOfCourse*100;
					}
			});
		}
		return `${result}%` ;
	}

}

console.log(student);
console.log(student.getName());
console.log(student.getAge());
student.addNewCourse("Guru", "PHP", 100);
console.log(student);
console.log(student.getAvarageMarkByCourse("JS"));
console.log(student.getAvarageMarkByCourse("PHP"));
console.log(student.getAvarageMark());
student.addMark("PHP", 5);
student.addMark("PHP", 6);
console.log(student);
student.addProgress("PHP", 20);
console.log(student);
console.log(student.getProgress("PHP"));