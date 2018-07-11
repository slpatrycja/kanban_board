var id = 0;
var addId = -1;
var changes = 0;
  $(function() {
    var repository = new Repository();
    load();

    $( ".sortable" ).sortable({
      connectWith: ".connectedSortable",
      receive: function( event, ui ) {
        changes = 1;
        var current_id = $(this).attr('id');
        $(this).children().each(function(){
            $(this).attr('id', current_id);
        })
        save();
      }

    }).disableSelection(); 

    

    $('#add-button').click(function() {
        
        changes = 1;
        addId+=1;
    	var txtNewItem = $('#new_text').val();
    	var card = $(this).closest('div.container').find('ul').append('<li><div class="card"><div class="card-block"><a href="#" class="btn del">&#10006;</a><p class="card-text">'+txtNewItem+'</p></div></div></li>');
        save();
        $(card).find('a').attr('id', addId);
        $('#new_text').val('');
        
        return addId;
        
        
    });    

    $(".del").click(function(){
        changes = 1;
        $(this).closest('.card').remove();
        $(this).closest('div.container').find('ul').remove('.card');
        save();

    });

    function save(){
        changes = 0;
        repository.clear();
        $('ul').each(function(){
            var cur_id = $(this).attr('id');
            $(this).children().each(function(){
                var wpis = new Note;
                wpis.note = $(this).find('p').text();
                wpis.status = cur_id;
                if (wpis.note != '')
                    repository.add(wpis);
            });
        });

    }

    function load() {
    
        var tabObj= repository.get();
        if (tabObj != null) {
            for (i = 0; i < tabObj.length; i++) {
               var txtNewItem = tabObj[i].note;
               var status = '#'+tabObj[i].status;
               var card = $('div.container').find('ul').filter(status).append('<li id='+status+'><div class="card"><div class="card-block"><a href="#" class="btn del">&#10006;</a><p class="card-text">'+txtNewItem+'</p></div></div></li>');
               $(card).find('a').attr('id', id);
                addId = tabObj[tabObj.length - 1].id;
                id+=1;
            }
           
        }
    }
   window.onbeforeunload = function() { 
    if (changes == 1)   
    return 'You will lose data changes.'; } 
  });
 
 
