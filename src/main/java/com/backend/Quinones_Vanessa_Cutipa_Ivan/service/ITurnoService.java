package com.backend.Quinones_Vanessa_Cutipa_Ivan.service;

import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.entrada.TurnoEntradaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.entrada.TurnoEntradaDtoId;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.salida.TurnoSalidaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.exceptions.BadRequestException;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ITurnoService {

    TurnoSalidaDto registrarTurno(TurnoEntradaDtoId turnoEntradaDtoId) throws BadRequestException, BadRequestException;
    List<TurnoSalidaDto> listarTurnos();

    TurnoSalidaDto buscarTurnoPorId(Long id);
    void eliminarTurno(Long id) throws ResourceNotFoundException;
    TurnoSalidaDto actualizarTurno(TurnoEntradaDto turnoEntradaDto, Long id) throws BadRequestException;

}
