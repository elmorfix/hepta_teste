var vm1 = new Vue({
  el : '#app_crud',
  data : {
    lista : [ {
      id : '1',
      nome : 'Teste'
    } ],

    dto : {id : '',
      nome : ''},
    initValue : 0,
    totalRegistros : 0
  },
      methods: {
        buscarPessoas: function() {
          listarPessoasREST();
        },

        salvarPessoa : function() {
          axios.post('http://externos.hepta.com.br:8080/CrudWS/rest/pessoa/salvar', this.dto)
            .then(function (response) {
              listarPessoasREST();
              limparCampos();
              showConfimation(this.dto);
            })
            .catch(function (error) {
              console.log(error);
            });

        },
        editarItem : function(obj) {
          this.dto = obj

        },
        showConfirmation: function(pessoa){
          document.createElement("div");
        },
        excluirItem : function(id) {
           axios.delete('http://externos.hepta.com.br:8080/CrudWS/rest/pessoa/deletar/'+id)
             .then(function (response) {
              console.log(response);
              listarPessoasREST();
              limparCampos();
            })
            .catch(function (error) {
              console.log(error);
            });


        },
        voltarListagem : function(){
          this.initValue = this.initValue - 10;
          listarPessoasREST();
        },
        avancarListagem : function(){
          this.initValue = this.initValue + 10;
          listarPessoasREST();
        }
      },
      created: listarInicial()
})

function limparCampos(){
  vm1.dto = {id:'',nome:''};
}

function listarPessoasREST(){
  axios.get("http://externos.hepta.com.br:8080/CrudWS/rest/pessoa/listar?initValue="+vm1.initValue)
        .then(response => {console.log(response.data);vm1.lista = response.data
          }).catch(function (error) {
            console.log(error);
          });

  getTotalRegistros();
}

function listarInicial(){
  axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.get("http://externos.hepta.com.br:8080/CrudWS/rest/pessoa/listar")
        .then(response => {console.log(response.data);vm1.lista = response.data
          }).catch(function (error) {
            console.log(error);
          });

  getTotalRegistros();
}


     function getTotalRegistros(){
      axios.get("http://externos.hepta.com.br:8080/CrudWS/rest/pessoa/total")
        .then(response => {vm1.totalRegistros = response.data
          }).catch(function (error) {
            console.log(error);
          });
    }
