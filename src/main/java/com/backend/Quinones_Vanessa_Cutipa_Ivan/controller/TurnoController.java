package com.backend.Quinones_Vanessa_Cutipa_Ivan.controller;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.entrada.TurnoEntradaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.entrada.TurnoEntradaDtoId;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.salida.TurnoSalidaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.exceptions.BadRequestException;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.exceptions.ResourceNotFoundException;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.service.ITurnoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/turnos")
@CrossOrigin
public class TurnoController {


    private final ITurnoService turnoService;

    public TurnoController(ITurnoService turnoService) {
        this.turnoService = turnoService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<TurnoSalidaDto> registrarTurno(@RequestBody @Valid TurnoEntradaDtoId turnoEntradaDtoId) throws BadRequestException {
        return new ResponseEntity<>(turnoService.registrarTurno(turnoEntradaDtoId), HttpStatus.CREATED);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<TurnoSalidaDto>> listarTurnos() {
        return new ResponseEntity<>(turnoService.listarTurnos(), HttpStatus.OK);
    }


    @GetMapping("/{id}")//localhost:8080/turnos/x
    public ResponseEntity<TurnoSalidaDto> buscarTurnoPorId(@PathVariable Long id) {
        return new ResponseEntity<>(turnoService.buscarTurnoPorId(id), HttpStatus.OK);
    }

    //PUT
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<TurnoSalidaDto> actualizarTurno(@RequestBody @Valid TurnoEntradaDto turnoEntradaDto, @PathVariable Long id) throws BadRequestException {
        return new ResponseEntity<>(turnoService.actualizarTurno(turnoEntradaDto, id), HttpStatus.OK);
    }

    //DELETE
    @DeleteMapping("/eliminar")//localhost:8080/turnos/eliminar?id=x
    public ResponseEntity<?> eliminarTurno(@RequestParam Long id) throws ResourceNotFoundException {
        turnoService.eliminarTurno(id);
        return new ResponseEntity<>("Turno eliminado correctamente", HttpStatus.NO_CONTENT);
    }
}