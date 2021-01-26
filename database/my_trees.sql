/* 
	@autor: Y & X Software
*/

drop database if exists my_trees;
create database my_trees;
use my_trees;

drop table if exists direccion;
create table direccion(
	id_direccion int not null primary key,	
    latitud nvarchar(100) not null, 
    longitud nvarchar(100) not null,
    referencias_ubicacion nvarchar(500) null
);

/* CATALOGO PARA DIFERENCIAR TIPOS DE REPORTES */
drop table if exists reporte_tipo;
create table reporte_tipo(
	id_tipo_reporte int not null primary key,
    descripcion nvarchar(100) not null unique
);

/* CATALOGO PARA DIFERENCIAR ESPECIES DE ÁRBOLES */
drop table if exists especies;
create table especies(
	id_especie int not null primary key,     
    nombre_taxonomico nvarchar(100) not null unique,
    nombre_comun nvarchar(100) not null
);


drop table if exists arbol;
create table arbol(
	id_arbol int not null primary key,
    id_direccion int not null,
    id_especie int not null,    
    diametro_tronco double not null,
    almacen_carbono double not null,
    captura_carbono double not null,
    remunicion_conta double not null,
    beneficios_mnx double not null,
    foto nvarchar(300),
    
    /* Foreign keys */    
    FOREIGN KEY (id_direccion) references direccion(id_direccion) on update cascade on delete cascade,
    FOREIGN KEY (id_especie) references especies(id_especie) on update cascade on delete cascade,
    FOREIGN KEY (id_direccion) references direccion(id_direccion) on delete cascade on update cascade
);

drop table if exists reporte;
create table reporte(
	id_reporte int not null primary key,
    observaciones nvarchar(1000) not null,
    id_arbol int not null,
    id_tipo_reporte int not null,
    imagen_reporte nvarchar(300) not null,
    estatus_reporte nvarchar(50) default "ENVIADO",
    fecha_reporte timestamp default current_timestamp,
    email_persona nvarchar(100) not null,
    nombre_persona nvarchar(100) not null,
    
    /*FOREIGN KEYS*/
    FOREIGN KEY (id_arbol) references arbol(id_arbol) on update cascade on delete cascade,
    FOREIGN KEY (id_tipo_reporte) references reporte_tipo(id_tipo_reporte) on update cascade on delete cascade
    
);


/*			INSERTS DE ESPECIES DE ÁRBOLES			*/

insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(1,'Liquidambar styraciflua','Liquidámbar');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(2,'Ficus benjamina','Laurel de la India');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(3,'Ulmus parvifolia','olmo chino');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(4,'Alnus acuminata','Aile');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(5,'Quercus rugosa','Encino quiebra hacha');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(6,'Ligustrum lucidum','Trueno chino');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(7,'Prunus serotina','Capulín');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(8,'Ficus carica','Higuera');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(9,'Dombeya wallichii','Dombeya de Madagascar');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(10,'Populus alba','Álamo blanco');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(11,'Populus deltoides','Chopo americano');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(12,'Chiranthodendron pentadactylon','Árbol de manitas');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(13,'Eucalyptus camaldulensis','Eucalipto australiano rojo');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(14,'Ginkgo biloba','Ginkgo');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(15,'Bauhinia variegata','Pata de vaca asiática');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(16,'Melaleuca citrina','Escobillón rojo');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(17,'Acacia retinodes','Acacia plateada');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(18,'Taxodium mucronatum','Ahuehuete');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(19,'Eucalyptus globulus','Eucalipto azul australiano');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(20,'Salix babylonica','sauce llorón');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(21,'Buddleja cordata','Tepozán blanco');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(22,'Ficus elastica','Hule');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(23,'Ficus lyrata','Árbol lira');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(24,'Magnolia grandiflora','Magnolia');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(25,'Eriobotrya japonica','Níspero chino');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(26,'Roystonea regia','Palma botella');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(27,'Washingtonia robusta','Palma blanca');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(28,'Phoenix canariensis','Palma canaria');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(29,'Yucca elephantipes','Izote');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(30,'Platycladus orientalis','Tuya');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(31,'Juniperus deppeana','sabino');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(32,'Cupressus lusitanica','Cedro blanco');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(33,'Cupressus benthamii','teotlate');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(34,'Cupressus sempervirens','Ciprés mediterráneo');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(35,'Chamaecyparis lawsoniana','falso ciprés');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(36,'Pinus teocote','pino azteca');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(37,'Pinus lumholtzii','pino triste');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(38,'Pinus ayacahuite','Pino ayacahuite');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(39,'Pinus montezumae','pino chamaite');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(40,'Pinus leiophylla','pino chimonque');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(41,'Pinus maximartinezii','Pino azul');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(42,'Pinus radiata','Pino de Monterrey');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(43,'Pinus cembroides','pino piñoñero');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(44,'Araucaria heterophylla','araucaria de Norfolk');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(45,'Fabaceae','Leguminosas');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(46,'Acacia melanoxylon','acacia negra de Tasmania');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(47,'Senna didymobotrya','Retama africana');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(48,'Senna multiglandulosa','Retama');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(49,'Delonix regia','Framboyán de Madagascar');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(50,'Erythrina americana','Colorín');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(51,'Prunus domestica','Ciruelo');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(52,'Prunus persica','Durazno');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(53,'Crataegus mexicana','Tejocote');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(54,'Malus pumila','manzano');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(55,'Pyrus communis','Peral');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(56,'Morus alba','Morera asiática');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(57,'Pittosporum tobira','Clavo verde asiático');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(58,'Celtis australis','Almez del Mediterráneo');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(59,'Arbutus','Madroños');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(60,'Arbutus xalapensis','Madroño');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(61,'Phytolacca dioica','Ombú');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(62,'Schinus terebinthifolia','Pimentero brasileño');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(63,'Citrus/aurantium','naranja');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(64,'Acer negundo','Negundo');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(65,'Aesculus hippocastanum','Castaño europeo');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(66,'Eucalyptus cinerea','Eucalipto dólar');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(67,'Lagerstroemia indica','Árbol de Júpiter');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(68,'Quercus obtusata','Encino blanco');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(69,'Casuarina cunninghamiana','Casuarina');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(70,'Ehretia tinifolia','Mandimbo');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(71,'Buddleja','Tepozanes');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(72,'Fraxinus uhdei','Fresno');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(73,'Olea europaea','olivo o acebuche');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(74,'Spathodea campanulata','Tulipán africano');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(75,'Jacaranda mimosifolia','jacaranda');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(76,'Duranta erecta','Coralillo');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(77,'Nicotiana glauca','Tabaquillo sudamericano');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(78,'Ipomoea murucoides','Cazahuate');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(79,'Schefflera actinophylla','Árbol pulpo australiano');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(80,'Pseudobombax ellipticum','Coquito');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(81,'Persea americana','Aguacate');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(82,'Populus tremuloides','Álamo temblón');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(83,'Salix bonplandiana','Ahuejote');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(84,'Grevillea robusta','Roble australiano');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(85,'Platanus/hispanica','Sicómoro');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(86,'Platanus mexicana','Álamo blanco');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(87,'Yucca gigantea','Izote gigante');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(88,'Ensete ventricosum','Falso plátano');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(89,'Syagrus romanzoffiana','Palmera pindó');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(90,'Pinus patula','ocote colorado');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(91,'Citrus/aurantiifolia','Limonero');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(92,'Juglans nigra','Nogal americano');
insert into especies (id_especie, nombre_taxonomico, nombre_comun) values(93,'Ceiba','Ceibas o pochotes');

/*		FIN DE INSERTS DE ESPECIES DE ÁRBOLES		*/



/*				INSERTS DE TIPOS DE REPORTES			*/
insert into reporte_tipo(id_tipo_reporte, descripcion) values (1, 'PODADO');
insert into reporte_tipo(id_tipo_reporte, descripcion) values (2, 'FUMIGADO');
insert into reporte_tipo(id_tipo_reporte, descripcion) values (3, 'DERRIBO');
insert into reporte_tipo(id_tipo_reporte, descripcion) values (4, 'REGADO');
insert into reporte_tipo(id_tipo_reporte, descripcion) values (5, 'OTRO');
/*			FIN DE INSERTS DE TIPOS DE REPORTES			*/




drop procedure if exists agregar_arbol ;
delimiter  **
create procedure agregar_arbol(in lat nvarchar(100),in longi nvarchar(100), in referencias_ubi nvarchar(500), in nombreCom nvarchar(100), diametro double, almacen double, captura double, remunicion double, beneficios double, foto nvarchar(300))
begin
	declare existe int;
	declare id_arbol_aux int;
    declare id_especie_aux int;
    declare id_direccion_aux int;

    declare msj nvarchar(100);
    if (lat != '' and longi != '') then
		set existe = (select count(id_arbol) from arbol, direccion where direccion.latitud = lat and direccion.longitud = longi);		
        if(existe = 0) then			
			set id_arbol_aux = (select ifnull(max(id_arbol) + 1,0) from arbol);        
			set id_especie_aux = (select id_especie from especies where nombre_comun = nombreCom);            
            if(id_especie_aux > 0) then
				set id_direccion_aux = (select ifnull(max(id_direccion)+1,0) from direccion);    
				insert into direccion(id_direccion, latitud, longitud, referencias_ubicacion) values (id_direccion_aux, lat, longi, referencias_ubi);
				insert into arbol (id_arbol, id_direccion, id_especie, diametro_tronco, almacen_carbono, captura_carbono, remunicion_conta, beneficios_mnx, foto) values (id_arbol_aux,id_direccion_aux,id_especie_aux,diametro,almacen, captura, remunicion, beneficios, foto);
				set msj = 'Árbol agregado correctamente :)';
			else 
				set msj = 'El nombre común que escribiste no corresponde a ninguna especie de árboles.';
			end if;
		else 
			set msj = 'Las coordenadas del árbol que intentas agregar ya corresponden a otro árbol';
        end if;
    end if;
    select msj as 'AVISO';
end **
delimiter   ;

select * from direccion;
select * from arbol;
select * from especies;

call agregar_arbol('19.419697','-99.191041','Se encuentra en una jardinera con rejas blancas','naranja',53.2,50,123,200,5000,'naranjo.jpg');
call agregar_arbol('19.419653','-99.190226','Se encuentra en una jardinera con rejas blancas','capulín',53.2,50,123,200,5000,'capulin.jpg');
call agregar_arbol('19.419072','-99.190999','Se encuentra en una jardinera con rejas blancas','aile',53.2,50,123,200,5000,'aile.jpg');
call agregar_arbol('19.418444','-99.190780','Se encuentra en una jardinera con rejas blancas','manzano',53.2,50,123,200,5000,'manzano.jpg');


drop procedure if exists buscar_arbol_gps;
delimiter **
create procedure buscar_arbol_gps(in lat nvarchar(100),in longi nvarchar(100))
begin
	declare existe int;
    declare id_dir_aux int;
    declare msj nvarchar(100);    
    if(lat != '' and longi != '')then
		set existe = (select count(id_direccion) from direccion where direccion.latitud = lat and direccion.longitud = longi);		        
        if(existe = 1) then
			set id_dir_aux = (select id_direccion from direccion where direccion.latitud = lat and direccion.longitud = longi);		            
			select arbol.id_arbol, arbol.foto from arbol inner join direccion on arbol.id_direccion = direccion.id_direccion where arbol.id_direccion = id_dir_aux;
        else
			set msj = 'No se encontraron registros de ese árbol';
            select msj as 'AVISO';
        end if;
	else
		set msj =  'Alguna de las coordenadas esta vacía.';
        select msj as 'AVISO';
    end if;
end**
delimiter ;

select * from direccion;
call buscar_arbol_gps('111','113');

drop procedure if exists agregar_reporte;
delimiter **
create procedure agregar_reporte(in id_arb int, in email nvarchar(100), in observaciones nvarchar(1000), in img_reporte nvarchar(300), in tipo_reporte varchar(100), in name_persona nvarchar(100))
begin

	declare id_tipo_reporte_aux int;
    declare id_reporte_max int;
    declare msj nvarchar(100);
    declare existe int;
    
    set existe = (select count(id_arbol) from arbol where id_arbol = id_arb);
    if(existe = 1) then
		set id_reporte_max = (select ifnull(max(id_reporte) + 1, 0) from reporte);
        if(tipo_reporte != '') then
			set existe = (select count(id_tipo_reporte) from reporte_tipo where descripcion = tipo_reporte);
            if (existe != 0) then
				set id_tipo_reporte_aux = (select id_tipo_reporte from reporte_tipo where descripcion = tipo_reporte);
				insert into reporte (id_reporte, observaciones, id_arbol, id_tipo_reporte, imagen_reporte, email_persona, nombre_persona) values (id_reporte_max, observaciones, id_arb, id_tipo_reporte_aux, img_reporte, email, name_persona);
				set msj = 'Reporte enviado con éxito. El ID de reporte es: ';
			else
				set msj = 'Ese tipo de reporte no existe';
			end if;
        else
			set msj = 'El tipo de reporte es necesario';
        end if;
    else
		set msj = 'Ese árbol no existe en la base de datos';
    end if;
    select concat_ws(' ', msj, id_reporte_max) as 'AVISO';
end**
delimiter ;

select * from arbol;
select * from reporte;
call agregar_reporte(3, 'isaac.mtz.san@outlook.com', 'El árbol esta a punto de caer sobre un puesto de tacos', './../images/reportado.jpg', 'OTRO', 'Isaac Martinez Sanchez');
call agregar_reporte(2, 'Rafael.Barajas@outlook.com', 'El árbol necesita un urgente podado', './../images/reportado_1.jpg', 'REGADO', 'Rafael Barajas Perez');
call agregar_reporte(1, 'Diego.Colon@outlook.com', 'El árbol necesita ser fumigado debido a una plaga de termitas', './../images/reportado_2.jpg', 'FUMIGADO', 'Diego Colon Valladares');

drop procedure if exists buscar_reporte;
delimiter **
create procedure buscar_reporte(in id_rep int)
begin

    declare msj nvarchar(100);
    declare existe int;
    
    set existe = (select count(id_reporte) from reporte where id_reporte = id_rep);
    if(existe = 1) then
        set msj = 'Existe';
    else
		set msj = 'ID de reporte erroneo';
    end if;
    select msj as 'AVISO';
end**
delimiter ;

drop procedure if exists seleccionar_reporte;
delimiter **
create procedure seleccionar_reporte(in id_rep int)
begin
	select id_reporte, observaciones, estatus_reporte, fecha_reporte from reporte where id_reporte = id_rep;
end**
delimiter ;


drop procedure if exists cancelar_reporte;
delimiter **
create procedure cancelar_reporte(in id_rep int)
begin
	declare msj nvarchar(100);
    declare existe int;
    
    set existe = (select count(id_reporte) from reporte where id_reporte = id_rep);
    if(existe = 1) then
        update reporte set estatus_reporte = "CANCELADO" where id_reporte = id_rep;
		set msj = 'Reporte cancelado';
    else
		set msj = 'ID de reporte erroneo';
    end if;
    select msj as 'AVISO';
end**
delimiter ;

select * from reporte;
select * from arbol;

drop procedure if exists obtener_todos_arboles;
delimiter **
create procedure obtener_todos_arboles()
begin
	select a.id_arbol, d.latitud, d.longitud, d.referencias_ubicacion, e.nombre_taxonomico, e.nombre_comun,
	a.diametro_tronco, a.almacen_carbono, a.captura_carbono, a.remunicion_conta, a.beneficios_mnx, a.foto
	from arbol a inner join direccion d on a.id_direccion = d.id_direccion inner join especies e on
	a.id_especie = e.id_especie;
end**
delimiter ;

call obtener_todos_arboles();


drop procedure if exists obtener_reporte_admin;
delimiter **
create procedure obtener_reporte_admin(in id_reporte_in int(10))
begin
	declare id_arbol_aux int;
    declare id_dir_aux int;
    set id_arbol_aux = (select id_arbol from reporte where id_reporte = id_reporte_in);
    set id_dir_aux = (select id_direccion from arbol where id_arbol = id_arbol_aux);
	select id_reporte, nombre_persona, email_persona, fecha_reporte, observaciones, estatus_reporte, imagen_reporte, direccion.latitud, direccion.longitud from reporte inner join arbol on reporte.id_arbol = arbol.id_arbol inner join direccion on arbol.id_direccion = direccion.id_direccion where id_reporte = id_reporte_in and direccion.id_direccion = id_dir_aux;
end**
delimiter ;

call obtener_reporte_admin(0);
call obtener_reporte_admin(1);
call obtener_reporte_admin(2);

drop procedure if exists obtener_todos_reportes;
delimiter **
create procedure obtener_todos_reportes()
begin
	select id_reporte, nombre_persona, email_persona, fecha_reporte, estatus_reporte from reporte;
end**
delimiter ;

drop procedure if exists cambiarEdo;
delimiter **
create procedure cambiarEdo(in id_rep int)
begin
	declare msj nvarchar(100);
    declare existe int;
    declare edo nvarchar(50);
    
    set existe = (select count(id_reporte) from reporte where id_reporte = id_rep);
    set edo = (select estatus_reporte from reporte where id_reporte = id_rep);
    if(existe = 1) then
		if(edo = "ENVIADO") then
			update reporte set estatus_reporte = "EN REVISION" where id_reporte = id_rep;
            set msj = 'Reporte actualizado';
		end if;
		if(edo = "EN REVISION") then 
			update reporte set estatus_reporte = "EN PROCESO" where id_reporte = id_rep;
            set msj = 'Reporte actualizado';
		end if;
        if(edo = "EN PROCESO") then
			update reporte set estatus_reporte = "COMPLETADO" where id_reporte = id_rep;
            set msj = 'Reporte actualizado';
		end if;
        if(edo = "COMPLETADO") then
			set msj = 'Reporte finalizado';
		end if;
    else
		set msj = 'ID de reporte inexistente';
    end if;
    select msj as 'AVISO';
end**
delimiter ;

call obtener_todos_reportes();
use my_trees;
select * from reporte;
select * from arbol;
select * from direccion;
