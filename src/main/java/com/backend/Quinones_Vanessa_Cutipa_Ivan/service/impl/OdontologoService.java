package com.backend.Quinones_Vanessa_Cutipa_Ivan.service.impl;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.entrada.OdontologoEntradaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.dto.salida.OdontologoSalidaDto;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.entity.Odontologo;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.repository.OdontologoRepository;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.service.IOdontologoService;
import com.backend.Quinones_Vanessa_Cutipa_Ivan.utils.JsonPrinter;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OdontologoService implements IOdontologoService {

    private final Logger LOGGER = LoggerFactory.getLogger(PacienteService.class);
    private final OdontologoRepository odontogoloRepository;
    private final ModelMapper modelMapper;

    public OdontologoService(OdontologoRepository odontogoloRepository, ModelMapper modelMapper) {
        this.odontogoloRepository = odontogoloRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public OdontologoSalidaDto registrarOdontologo(OdontologoEntradaDto odontologoEntradaDto) {
       LOGGER.info("OdontologoEntradaDTO: " + odontologoEntradaDto);
       Odontologo odontologo = modelMapper.map(odontologoEntradaDto, Odontologo.class);
       LOGGER.info("OdontologoEntidad: " + odontologo);
       OdontologoSalidaDto odontologoSalidaDto = modelMapper.map(odontogoloRepository.save(odontologo), OdontologoSalidaDto.class);
       LOGGER.info("OdotologoSalidaDTO: " + odontologoSalidaDto);
        return odontologoSalidaDto;
    }

    @Override
    public List<OdontologoSalidaDto> listarOdontologos() {
        List<OdontologoSalidaDto> odontologos = odontogoloRepository.findAll().stream().map(odontolgo -> modelMapper.map(odontolgo, OdontologoSalidaDto.class)).toList();
        LOGGER.info("Listado de todos los pacientes: {}", odontologos);
        return odontologos;
    }

    @Override
    public OdontologoSalidaDto buscarOdontologoPorId(Long id) {

        Odontologo odontologoBuscado = odontogoloRepository.findById(id).orElse(null);
        OdontologoSalidaDto odontologoEncontrado = null;
        if (odontologoBuscado != null){
            odontologoEncontrado = modelMapper.map(odontologoBuscado, OdontologoSalidaDto.class);
            LOGGER.info("Odontologo encontrado {}", JsonPrinter.toString(odontologoEncontrado));

        }else LOGGER.error("Odontologo no se ha encontrado con el id: {}", id);

        return odontologoEncontrado;
    }

    @Override
    public void eliminarOdontologo(Long id) {
        if (buscarOdontologoPorId(id) != null){
            odontogoloRepository.deleteById(id);
            LOGGER.warn("Se ha eliminado el odontolog con id {}", id);
        }
    }

    @Override
    public OdontologoSalidaDto actualizarOdontologo(OdontologoEntradaDto odontologoEntradaDto, Long id) {

        Odontologo odontologoRecibido = modelMapper.map(odontologoEntradaDto, Odontologo.class);
        Odontologo odontologoAModificar = odontogoloRepository.findById(id).orElse(null);
        OdontologoSalidaDto odontologoSalidaDto = null;
        if (odontologoAModificar != null){
            odontologoRecibido.setId(odontologoAModificar.getId());
            odontologoAModificar = odontologoRecibido;

            odontogoloRepository.save(odontologoAModificar);
            odontologoSalidaDto = modelMapper.map(odontologoAModificar, OdontologoSalidaDto.class);
            LOGGER.warn("Odontologo modificado: {}", JsonPrinter.toString(odontologoSalidaDto));
        }else {
            LOGGER.error("No fue posible modificar el odontologo porque no se encuentra en la base de datos.");
        }
        return odontologoSalidaDto;
    }


}


