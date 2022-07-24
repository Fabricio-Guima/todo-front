<template>
  <div>
    <transition>
      <div class="container" v-if="todos && todos.length" key="hasTodo">
        <h1>Todos</h1>
        <div class="row">
          <div
            v-for="(todo, index) in todos"
            :key="index"
            class="col-sm-12 col-md-6 col-lg-4 mb-4 align-items-center"
          >
            <div class="card mx-auto" style="width: 18rem">
              <router-link :to="{ name: 'todo', params: { id: todo.id } }">
                <div class="p-1 fake-img bg-primary text-white">
                 
                  <p class="text-white font-weight-bold">
                    Finalizado: <span>{{ yesOrNo(todo.done) }}</span>
                  </p>
                  <p class="text-white font-weight-bold mb-3">
                    Data limite: <span>{{ todo.ends_at }}</span>
                  </p>
                  <div
                    class="d-flex justify-content-end position-relative"
                    style="height: auto"
                  >
                    <b-badge class="position-absolute" variant="warning">{{
                      deadline(todo.ends_at)
                    }}</b-badge>
                  </div>
                </div>
                <div class="card-body">
                  <span class="font-weight-bold"> Descrição: </span>
                  <p class="card-text">
                    {{ todo.description | truncate(25) }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-5">
          <Pagination :totalItems="totalItems" />
        </div>
      </div>

      <div
        class="container height"
        v-else-if="todos && todos.length === 0"
        key="hasNoProduct"
      >
        <div class="row">
          <h2>Não há todos a serem visualizados</h2>
        </div>
      </div>

      <div class="container height" v-else key="loading">
        <div class="row height justify-content-center align-items-center">
          <loading class="mt-5" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      todos: [],
      totalItems: 0,
    };
  },
  computed: {
    url() {
      return `/todos?page=${Number(this.$route.query.page)}`;
    },
    yesOrNo() {
      return (param) => (param ? "sim" : "não");
    },
    deadline() {
      return (param) => {
        let splitedDate = param.split(" ");
        console.log('data agora',  Date.now())
        console.log('data todo', Date.parse(splitedDate[0]))
        return Date.parse(splitedDate[0]) >= Date.now()
          ?  "dentro do prazo"
          : "fora do prazo"
          
      };
    },
  },
  methods: {
    getTodos() {
      this.todos = null;

      this.$axios.get(this.url).then((response) => {
        console.log("todos", response.data.data);
        this.todos = response.data.data;
        this.totalItems = Number(response.data.meta.total);
      });
    },
  },
  watch: {
    url() {
      this.getTodos();
    },
  },
  created() {
    this.getTodos();
  },
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
a {
  text-decoration: none !important;
}
a:hover {
  color: #007bff !important;
}
.container-card {
  display: flex;

  border-radius: 4px;
}

div.card {
  min-height: 300px !important;
  border-radius: 4px;
}
.fake-img {
  width: 100%;
  height: 150px;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
  top: 40px;
  right: 0;
}

.height {
  height: 100vh !important;
}
</style>
