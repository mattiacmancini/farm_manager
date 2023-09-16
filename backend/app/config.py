# -*- coding: utf-8 -*-
# Copyright (c) 2023 Mattia C. Mancini
# Mattia C. Mancini (mattia.mancini@gmail.com), September 2023
"""
Read a json config file storing all the necessary variables
and parameters for running the farm manager app
"""

import configparser
import os

class AppConfig:
    """
    Class to parse and format a configuration file containing all 
    the necessary parameters to run the farm manager app
    """
    def __init__(self, config_file_path):
            self.get_config(config_file_path)

    def get_config(self, config_file_path):
        """
        Parse items from the config.ini file
        """
        config = configparser.ConfigParser()
        config.read(config_file_path)
        for section_name in config.sections():
            section = config[section_name]
            section_dict = {key: os.path.expandvars(value) for key, value in section.items()}
            setattr(self, section_name, section_dict)

    def __str__(self):
        """
        Format and return a string representation of the AppConfig object
        """
        result = ""
        for section_name in dir(self):
            if not callable(getattr(self, section_name)) and not section_name.startswith("__"):
                result += f"[{section_name}]\n"
                section = getattr(self, section_name)
                for key, value in section.items():
                    result += f"{key} = {value}\n"
        return result
