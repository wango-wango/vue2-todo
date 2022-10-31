<template>
    <div class="todoList">
        <h1>{{ msg }}</h1>
        <input type="text" placeholder="what needs to be done" class="todo-input" v-model="newTodo"
            @keyup.enter="addTodo" />
        <transition-group name="fade" enter-active-class="animate__animated animate__fadeInUp" leave-active-class="animate__animated animate__fadeOutDown">
            <div v-for="item in todoFiltered" :key="item.id" class="todo-item">
                <div class="todo-item-container">
                    <input type="checkbox" v-model="item.completed" />
                    <!-- :class 可以綁定data 並用 : 後面放判斷式 -->
                    <div class="todo-item-label" :class="{ completed: item.completed }" v-if="item.edited === false"
                        @dblclick="editedItem(item)">
                        {{ item.title }}
                    </div>
                    <!-- 雙擊後進入編輯狀態 -->
                    <!-- blur => 點到 input 外面 = focusout -->
                    <!-- keyup.enter 偵測 enter 按完之後 -->
                    <input class="todo-item-edit" type="text" v-model="item.title" v-else @keyup.enter="editedItem(item)"
                        @blur="editedItem(item)" @keyup.esc="cancelEdit(item)" v-focus />
                </div>
                <div class="remove-item" @click="removeItem(item.id)" @mouseover="removeBtn(item)"
                    @mouseleave="removeBtn(item)">
                        <i class="bi bi-x-square" v-if="item.deleted == false"></i>
                        <i class="bi bi-x-square-fill" v-else></i>
                </div>
            </div>
        </transition-group>

        <div class="extra-container">
            <div>
                <label>
                    <input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos" />
                    Check All
                </label>
            </div>
            <div class="items-left">{{ remaining }} items left</div>
        </div>
        <div class="extra-container-down">
            <div>
                <!-- 當 filter == 'all' 的時候 active -->
                <button :class="{ active: filter == 'all' }" @click="filter = 'all'">
                    All
                </button>
                <button :class="{ active: filter == 'active' }" @click="filter = 'active'">
                    Active
                </button>
                <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">
                    Completed
                </button>
            </div>
            <div>
                <transition name="fade">
                    <button v-if="showClearBtn" @click="clearCompleted">Clear Completed</button>
                </transition>
            </div>
        </div>
        
        <!-- <router-link to="/">home</router-link> -->
    </div>
</template>

<script>
export default {
    name: "todoList",
    data() {
        return {
            msg: "todoList",
            newTodo: "",
            idForTodo: 3,
            beforeEditCache: "",
            filter: 'all',
            todos: [
                {
                    id: 1,
                    title: "Finish Vue Screencast",
                    completed: false,
                    deleted: false,
                    edited: false,
                },
                {
                    id: 2,
                    title: "Take over the world",
                    completed: false,
                    deleted: false,
                    edited: false,
                },
            ],
        };
    },
    // methods 比較像是計算的函式庫
    methods: {
        addTodo() {
            // trim() 方法會移除字串起始及結尾處的空白字元。
            // 因此如果沒有輸入字元，就不會新增
            if (this.newTodo.trim().length == 0) return;
            // 將資料存進去
            this.todos.push({
                id: this.idForTodo,
                title: this.newTodo,
                completed: false,
                deleted: false,
                edited: false,
            });
            // 存完之後把newTodo清空
            this.newTodo = "";
            // 並將 id+1 
            this.idForTodo++;
        },
        removeItem(itemID) {
            // 用 filter 把該資料刪除
            this.todos = this.todos.filter((v) => v.id !== itemID);
        },
        removeBtn(item) {
            // 用 mouseEvent 去控制 btn 樣式
            item.deleted == false ? (item.deleted = true) : (item.deleted = false);
        },
        editedItem(item) {
            // 如果編輯時把資料全部清除，就把該筆資料清除
            if (item.title.trim() == "") this.removeItem(item.id);
            // 在編輯之前先把原本的title 存起來
            this.beforeEditCache = item.title;
            // 判斷現在是否正在編輯
            item.edited == false ? (item.edited = true) : (item.edited = false);
        },
        cancelEdit(item) {
            // 取消編輯，回復到初始狀態
            item.edited = false;
            item.title = this.beforeEditCache;
        },
        checkAllTodos() {
            this.todos.forEach((todo) => (todo.completed = event.target.checked));
        },
        clearCompleted() {
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    },
    mounted() {
        console.log("todoList");
    },
    // 這裡可以直接呼叫function得到要回傳的值
    computed: {
        remaining() {
            return this.todos.filter((todo) => !todo.completed).length;
        },
        anyRemaining() {
            return this.remaining != 0;
        },
        todoFiltered() {
            if (this.filter == 'all') {
                // 回傳全部
                return this.todos;
            } else if (this.filter == 'active') {
                if (this.todos.filter(v => !v.completed).length === 0) {
                    alert("there's nothing being active")
                    this.filter = 'all'
                    return this.todos;
                } else {
                    // 回傳 completed == false
                    return this.todos.filter(v => !v.completed)
                }
            } else if (this.filter == 'completed') {
                if (this.todos.filter(v => v.completed).length === 0) {
                    alert("there's nothing being completed")
                    this.filter = 'all'
                    return this.todos;
                } else {
                    // 回傳 completed == true
                    return this.todos.filter(v => v.completed)
                }
            }
            // 初始狀態
            return this.todos;
        },
        showClearBtn() {
            return this.todos.filter(v => v.completed).length > 0
        }
    },
    directives: {
        // 綁定之後 會立刻執行此函式
        focus: {
            // vue2 用 inserted vue3 用 mounted
            inserted: function (el) {
                el.focus();
            },
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");
.todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 1.2rem;
    margin-bottom: 1rem;

    &:focus {
        outline: none;
    }
}

.todo-item {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation-duration: 0.5s;

    .remove-item {
        cursor: pointer;
        margin-left: 1rem;
    }

    .todo-item-container {
        display: flex;
        align-items: center;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        font-size: 1.5rem;

        .todo-item-label {
            padding: 1rem;
            border: 1px solid white;
            margin-left: 1rem;
            transition: 0.3s ease-in-out;

            &.completed {
                text-decoration: line-through;
                color: #999;
            }
        }

        .todo-item-edit {
            color: #2c3e50;
            margin-left: 1rem;
            width: 100%;
            padding: 1rem;

            border: 1px solid #ccc;

            &:focus {
                outline: none;
            }
        }
    }
}

.extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    border-top: 1px solid lightgrey;
    padding-top: 1rem;
    margin-bottom: 1rem;

    label {
        input {
            margin-right: 1.5rem;
        }

        font-size: 1.2rem;
    }

    .items-left {
        color: #666;
    }

}

.extra-container-down {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    border-top: 1px solid lightgrey;
    padding-top: 1rem;
    margin-bottom: 1rem;

    button {
        font-size: 1rem;
        color: white;
        appearance: none;
        padding: 0.3rem 0.5rem;
        border: none;
        border-radius: 0.4rem;
        background-color: #999;

        &:hover {
            background: rgb(92, 92, 92);
        }

        &:focus {
            outline: none;
        }

    }

    .active {
        background: rgb(35, 161, 35);
    }

    
}
.fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
</style>
