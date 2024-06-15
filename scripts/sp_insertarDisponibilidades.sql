IF EXISTS (SELECT top 1 1 FROM sysobjects 
	   WHERE name = 'sp_insertarDisponibilidades' AND type = 'P')
	    DROP PROCEDURE sp_insertarDisponibilidades
go

create procedure dbo.sp_insertarDisponibilidades (@idEscenario bigint  )
  
as 
	begin
	declare @horainicial time,@horafinal time,@hora time,@fechaact datetime,@fechaprox datetime
	select @fechaact =SYSDATETIME(),@fechaprox=dateadd(m,1,SYSDATETIME())
	while @fechaact<@fechaprox
	begin	
		select @horainicial=horaInicial,@horafinal=horaFinal from escenariosDeportivos a
		inner join horarios b on a.idHorario=b.idHorario
		where a.idEscenario=@idEscenario
		while @horainicial<@horafinal
		begin
			select @hora= @horainicial,@horainicial= DATEADD(hh,1,@horainicial)
			insert into disponibilidades (idEscenario,hora,mes,dia)
			select @idEscenario,@hora,month(@fechaact),day(@fechaact)
		end
		set @fechaact= dateadd(d,1,@fechaact)
	end
end