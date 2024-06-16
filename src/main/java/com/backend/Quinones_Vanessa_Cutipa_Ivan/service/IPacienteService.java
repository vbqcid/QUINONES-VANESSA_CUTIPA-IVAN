package com.backend.Quinones_Vanessa_Cutipa_Ivan.service;

import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.entrada.PacienteEntradaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.salida.PacienteSalidaDto;

import java.util.List;

public interface IPacienteService {

    PacienteSalidaDto registrarPaciente(PacienteEntradaDto pacienteEntradaDto);
    List<PacienteSalidaDto> listarPacientes();

    PacienteSalidaDto buscarPacientePorId(Long id);
    void eliminarPaciente(Long id);
    PacienteSalidaDto actualizarPaciente(PacienteEntradaDto pacienteEntradaDto, Long id);


}
