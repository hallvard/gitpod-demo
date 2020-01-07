FROM gitpod/workspace-full-vnc

RUN bash -c ". /home/gitpod/.sdkman/bin/sdkman-init.sh \
             && sdk install java 13.0.1.j9-adpt"
