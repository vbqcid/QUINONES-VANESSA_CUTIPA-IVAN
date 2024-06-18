package com.backend.Quinones_Vanessa_Cutipa_Ivan.service.impl;

import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.entrada.DomicilioEntradaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.entrada.TurnoEntradaDtoId;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.entrada.PacienteEntradaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.entrada.OdontologoEntradaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.salida.OdontologoSalidaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.salida.PacienteSalidaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.salida.TurnoSalidaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.exceptions.BadRequestException;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TurnoServiceTest {

    @Autowired
    private TurnoService turnoService;

    @Autowired
    private PacienteService pacienteService;

    @Autowired
    private OdontologoService odontologoService;

    private Long pacienteId;
    private Long odontologoId;

    @BeforeEach
    public void setUp() {
        // Crear un paciente
        PacienteEntradaDto pacienteEntradaDto = new PacienteEntradaDto("Juan", "Perez", 123456, LocalDate.of(2024, 6, 22), new DomicilioEntradaDto("Calle", 123, "Localidad", "Provincia"));
        PacienteSalidaDto pacienteSalidaDto = pacienteService.registrarPaciente(pacienteEntradaDto);
        assertNotNull(pacienteSalidaDto);
        pacienteId = pacienteSalidaDto.getId();

        // Crear un odontólogo
        OdontologoEntradaDto odontologoEntradaDto = new OdontologoEntradaDto(12345, "Pedro", "Perez");
        OdontologoSalidaDto odontologoSalidaDto = odontologoService.registrarOdontologo(odontologoEntradaDto);
        assertNotNull(odontologoSalidaDto);
        odontologoId = odontologoSalidaDto.getId();
    }

    @Test
    @Order(1)
    public void deberiaCrearUnTurno() {
        TurnoEntradaDtoId turnoEntradaDtoId = new TurnoEntradaDtoId();
        turnoEntradaDtoId.setIdPaciente(pacienteId);
        turnoEntradaDtoId.setIdOdontologo(odontologoId);

        assertDoesNotThrow(() -> {
            TurnoSalidaDto turnoCreado = turnoService.registrarTurno(turnoEntradaDtoId);
            assertNotNull(turnoCreado);
            assertNotNull(turnoCreado.getId());
            assertEquals(pacienteId, turnoCreado.getPacienteSalidaDto().getId());
            assertEquals(odontologoId, turnoCreado.getOdontologoSalidaDto().getId());
        });
    }

    @Test
    @Order(2)
    public void deberiaEliminarseElTurnoConId1() {
        assertDoesNotThrow(() -> turnoService.eliminarTurno(1L));
    }

    @Test
    @Order(3)
    public void deberiaRegistrarseUnTurno_yRetornarSuId() {
        TurnoEntradaDtoId turnoEntradaDtoId = new TurnoEntradaDtoId();
        turnoEntradaDtoId.setIdPaciente(pacienteId);
        turnoEntradaDtoId.setIdOdontologo(odontologoId);

        assertDoesNotThrow(() -> {
            TurnoSalidaDto turnoCreado = turnoService.registrarTurno(turnoEntradaDtoId);
            assertNotNull(turnoCreado);
            assertNotNull(turnoCreado.getId());
        });
    }

    @Test
    @Order(4)
    public void deberiaDevolverUnaListaNoVaciaDeTurnos() throws BadRequestException {
        // Registrar un turno para que la lista no esté vacía
        TurnoEntradaDtoId turnoEntradaDtoId = new TurnoEntradaDtoId();
        turnoEntradaDtoId.setIdPaciente(pacienteId);
        turnoEntradaDtoId.setIdOdontologo(odontologoId);
        turnoService.registrarTurno(turnoEntradaDtoId);

        assertFalse(turnoService.listarTurnos().isEmpty());
    }
}
