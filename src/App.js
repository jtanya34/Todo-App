import './App.css';
import { useRef, useState, React, useEffect } from 'react';

function App() {
	const inputRef = useRef(null);
	const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')));
	const [completedList, setCompletedList] = useState(JSON.parse(localStorage.getItem('completedList')));
	const [taggedList, setTaggedList] = useState(JSON.parse(localStorage.getItem('taggedList')));

	const addTodoItem = () => {
		let value = inputRef.current.value;

		if (value != '') {
			if (todoList !== null) {
				setTodoList([...todoList, value]);
				localStorage.setItem('todoList', JSON.stringify([...todoList, value]));
			} else {
				setTodoList([value]);
				localStorage.setItem('todoList', JSON.stringify([value]));
			}
		}

		inputRef.current.value = '';
	};

	const handleKeyPress = (event) => {
		if (event.charCode == 13) {
			addTodoItem();
		}
	};
	const markComplete = (e, value) => {
		if (value != '') {
			let newtodoList = todoList.filter((todo) => todo != value);
			setTodoList([...newtodoList]);
			localStorage.setItem('todoList', JSON.stringify([...newtodoList]));
			if (completedList !== null) {
				setCompletedList([...completedList, value]);
				localStorage.setItem('completedList', JSON.stringify([...completedList, value]));
			} else {
				setCompletedList([value]);
				localStorage.setItem('completedList', JSON.stringify([value]));
			}
		}
	};

	const onHandleClear = () => {
		localStorage.setItem('completedList', JSON.stringify([]));
    localStorage.setItem('todoList', JSON.stringify([]));
    localStorage.setItem('taggedList', JSON.stringify({}));
		setTodoList([]);
    setCompletedList([]);
    setTaggedList({})
	};

	const handleHashTags = (value) => {
		if (value.includes('#')) {
			let tag = value.split(' ')[0];
      let todoTagged = todoList.filter((each) => each.split(' ')[0] === tag);
      let completedTagged = completedList.filter((each) => each.split(' ')[0] === tag);
      let obj={}
			 obj[tag] = [...todoTagged,...completedTagged] ;
			if (taggedList !== null) {
				setTaggedList({ ...taggedList, ...obj });
				localStorage.setItem('taggedList', JSON.stringify({ ...taggedList, ...obj }));
			} else {
				setTaggedList(obj);
				localStorage.setItem('taggedList', JSON.stringify(obj));
			}
		}
	};
	return (
		<div className="main">
			<div className="header">
				<div className="input-header">
					<input id="inputTask" placeholder="Enter a task" type="text" onKeyPress={handleKeyPress} ref={inputRef} />
					<button className="button" onClick={addTodoItem}>
						Add Task
					</button>
					<button className="clear-btn button" onClick={onHandleClear}>
						Clear All
					</button>
				</div>
				<div className="list-header">
					{(todoList == null || todoList.length === 0) && (completedList == null || completedList.length === 0) ? (
						<div className="empty">
							<p>Start your day...</p>
						</div>
					) : (
						<>
							<div className="list-body-todo">
								<h1>Todo Task</h1>
								<ul id="todoList">
									{todoList &&
										todoList.map((each, index) => (
											<li key={index} onClick={() => handleHashTags(each)}>
												{each}
												<a onClick={(e) => markComplete(e, each)}>done</a>
											</li>
										))}
								</ul>
							</div>

							<div className="list-header-completed">
								<h1>Completed Task</h1>
								<ul id="completedList" >
									{completedList &&
										completedList.map((each, index) => (
											<li key={index} id="completedList" onClick={() => handleHashTags(each)}>
												{each}
											</li>
										))}
								</ul>
							</div>
						</>
					)}
				
				</div>
			</div>
      <div className="list-header-hashtag">
						<h1>Tagged Task</h1>
						<ul id="taggedList">
							{taggedList &&
                Object.keys(taggedList).map((list) =>
                <div className="tagList">
                  <h3>{list}</h3>
                {taggedList[list].map((each, index) => (
										<li key={index} id="taggedList">
											{each}
										</li>
									))}
                  </div>
								)}
						</ul>
					</div>
		</div>
	);
}

export default App;
