angular.module("toDoList", []).controller("toDoListCtr", function ($scope) {
	
	vm = this;
	
	vm.app = "To do List";
	
	/*Objetos*/
	vm.listaTarefas = [];
	vm.nomeTarefa = "";
	vm.totalTarefasCompletar = vm.listaTarefas.length;
	vm.totalTarefasTerminada = 0;
	vm.porcentagem = 0;
	vm.isIncluir = false;
	
	/*Metodos*/
	
	vm.carregarTarefasDefault = carregarTarefasDefault;
	vm.limparLista = limparLista;
	vm.adicionarTarefa = adicionarTarefa;
	vm.contabilizarTarefa = contabilizarTarefa;
	vm.excluirTarefa = excluirTarefa;
	vm.calcularPercentual = calcularPercentual;
	
	vm.listasTarefas = {};
	
	function carregarTarefasDefault() {
		
		vm.listasTarefas = [{"nomeLista" : "Lista Default", "id" : "1", "lista" : 
								[{"nomeTarefa" : "Cortar a grama", "concluida" : "false"},
      		                  	 {"nomeTarefa" : "Lavar o carro" , "concluida" : "false"},
    		                  	 {"nomeTarefa" : "Dar banho no cachorro" , "concluida" : "false"}
    		                  	 ]},
		                    {"nomeLista" : "Lista 2", "id" : "2", "lista" : 
		                    	[	{"nomeTarefa" : "Jogar", "concluida" : "false"},
  		                  	 		{"nomeTarefa" : "Correr" , "concluida" : "false"}
		                    	]
		                    }];
		console.log("vm.listasTarefas ", vm.listasTarefas);												
	};
	
	vm.incluirLista = incluirLista;
	vm.cancelar = cancelar;
	vm.confirmarIncluir = confirmarIncluir;
	vm.listaIncluir = {};
	
	vm.abrirLista = abrirLista;
	vm.nomeLista = "To do List";
	
	function abrirLista(listaTarefas){
		console.log("listaTarefas ", listaTarefas);
		vm.listaTarefas = listaTarefas.lista;
		vm.nomeLista = listaTarefas.nomeLista;
		vm.totalTarefasCompletar = vm.listaTarefas.length;
	}
	
	function incluirLista(){
		vm.isIncluir = true;
		vm.listaIncluir = {};
		vm.listaIncluir.nome = "";
	}
	
	function cancelar(){
		vm.isIncluir = false;
	}
	
	function confirmarIncluir(){
		console.log("vm.listaIncluir ", vm.listaIncluir);
		vm.isIncluir = false;
	}
	
	function limparLista(){
		vm.listaTarefas = [];
		contabilizarTarefa();
	}
	
	function adicionarTarefa(){
		
		var obj = {};
		obj.nomeTarefa = vm.nomeTarefa;
		obj.concluida = false;
		vm.listaTarefas.push(obj);
		vm.nomeTarefa = "";
		
		contabilizarTarefa();
	}
	
	function contabilizarTarefa(){
			var concluida = 0;
			var naoConcluida = 0;
			
			for(var i = 0; i < vm.listaTarefas.length ; i++){
				if(vm.listaTarefas[i].concluida === true){
					concluida++;
				}else{
					naoConcluida++;
				}
			}
			
			vm.totalTarefasCompletar = naoConcluida;
			vm.totalTarefasTerminada = concluida;
		
			calcularPercentual();
		
	}
	
	function excluirTarefa(tarefa){
		
		var lista = [];
		for(var i = 0; i < vm.listaTarefas.length ; i++){
			if(vm.listaTarefas[i].nomeTarefa != tarefa.nomeTarefa){
				lista.push(vm.listaTarefas[i]);
			}
		}
		
		vm.listaTarefas = lista;
		contabilizarTarefa();
		
	}
	
	function calcularPercentual(){
		
		if(vm.listaTarefas.length == 0){
			vm.porcentagem = 100;
		}else{
			vm.porcentagem = (vm.totalTarefasTerminada * 100) / vm.listaTarefas.length;
		}
		document.getElementById("pg").value = vm.porcentagem;
	}
	
	carregarTarefasDefault();
});

